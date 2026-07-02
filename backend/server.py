from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email config (Emergent managed proxy)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "CleanDrive")
NOTIFICATION_EMAIL = os.environ.get("NOTIFICATION_EMAIL", "info@cleandrive.in")

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ------------------ Models ------------------
class EnquiryCreate(BaseModel):
    full_name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=6, max_length=20)
    email: Optional[EmailStr] = None
    address: str = Field(..., min_length=1, max_length=500)
    car_type: str  # "5 Seater" | "7 Seater"
    preferred_plan: str
    preferred_time_slot: str
    message: Optional[str] = Field(default=None, max_length=1000)


class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    phone: str
    email: Optional[str] = None
    address: str
    car_type: str
    preferred_plan: str
    preferred_time_slot: str
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False


# ------------------ Email helper ------------------
def build_enquiry_email_html(enq: Enquiry) -> str:
    def row(label, value):
        return (
            f"<tr>"
            f"<td style='padding:10px 14px;background:#F0F4F8;color:#475569;"
            f"font-family:Arial,sans-serif;font-size:13px;width:180px;"
            f"border-bottom:1px solid #E2E8F0;'>{label}</td>"
            f"<td style='padding:10px 14px;color:#0A2540;font-family:Arial,sans-serif;"
            f"font-size:14px;border-bottom:1px solid #E2E8F0;'>{value or '-'}</td>"
            f"</tr>"
        )

    created = enq.created_at.strftime("%d %b %Y, %I:%M %p UTC")
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F4F8;padding:24px 0;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E2E8F0;">
          <tr>
            <td style="background:#0A2540;padding:24px 28px;">
              <div style="color:#38BDF8;font-family:Arial,sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;">CleanDrive</div>
              <div style="color:#FFFFFF;font-family:Arial,sans-serif;font-size:22px;font-weight:700;margin-top:6px;">New Enquiry Received</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 28px;">
              <p style="color:#475569;font-family:Arial,sans-serif;font-size:14px;margin:0 0 16px;">
                A new customer just submitted an enquiry on the CleanDrive website.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E8F0;border-radius:8px;overflow:hidden;">
                {row("Full Name", enq.full_name)}
                {row("Phone", enq.phone)}
                {row("Email", enq.email)}
                {row("Address / Area", enq.address)}
                {row("Car Type", enq.car_type)}
                {row("Preferred Plan", enq.preferred_plan)}
                {row("Preferred Time Slot", enq.preferred_time_slot)}
                {row("Message", enq.message)}
                {row("Submitted At", created)}
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#F0F4F8;padding:16px 28px;color:#94A3B8;font-family:Arial,sans-serif;font-size:12px;">
              CleanDrive · Doorstep Car Wash · Surat, Gujarat
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
    """


async def send_enquiry_email(enq: Enquiry) -> bool:
    if not EMAIL_KEY:
        logger.warning("EMERGENT_EMAIL_KEY missing; skipping email send")
        return False
    payload = {
        "to": [NOTIFICATION_EMAIL],
        "subject": f"New CleanDrive Enquiry - {enq.full_name} ({enq.car_type})",
        "html": build_enquiry_email_html(enq),
        "from_name": EMAIL_FROM_NAME,
    }
    if enq.email:
        payload["contact_email"] = enq.email
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return True
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        return False
    except Exception as e:
        logger.error(f"Email send error: {e}")
        return False


# ------------------ Routes ------------------
@api_router.get("/")
async def root():
    return {"message": "CleanDrive API", "status": "ok"}


@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(input: EnquiryCreate):
    if input.car_type not in ("5 Seater", "7 Seater"):
        raise HTTPException(status_code=400, detail="Invalid car type")

    enq = Enquiry(**input.model_dump())
    email_ok = await send_enquiry_email(enq)
    enq.email_sent = email_ok

    doc = enq.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.enquiries.insert_one(doc)
    return enq


@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries():
    items = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for it in items:
        if isinstance(it.get("created_at"), str):
            it["created_at"] = datetime.fromisoformat(it["created_at"])
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
