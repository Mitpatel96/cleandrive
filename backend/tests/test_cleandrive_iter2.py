"""CleanDrive Iteration 2 backend tests: auth (JWT Bearer), protected enquiries, public enquiry create, admin seeding."""
import os
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else "https://cleandrive-surat.preview.emergentagent.com"
ADMIN_EMAIL = "admin@gmail.com"
ADMIN_PASSWORD = "Cleandrive24"


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(api):
    r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    data = r.json()
    assert data.get("access_token")
    return data["access_token"]


# ---------------- Health ----------------
class TestHealth:
    def test_root(self, api):
        r = api.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# ---------------- Auth: login ----------------
class TestAuthLogin:
    def test_login_success(self, api):
        r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data.get("access_token"), str) and len(data["access_token"]) > 20
        assert data.get("token_type") == "bearer"
        assert data.get("email") == ADMIN_EMAIL

    def test_login_wrong_password(self, api):
        r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpass"})
        assert r.status_code == 401
        assert "detail" in r.json()

    def test_login_unknown_user(self, api):
        r = api.post(f"{BASE_URL}/api/auth/login", json={"email": "noone@example.com", "password": "whatever"})
        assert r.status_code == 401

    def test_login_case_insensitive_email(self, api):
        r = api.post(f"{BASE_URL}/api/auth/login", json={"email": "ADMIN@GMAIL.COM", "password": ADMIN_PASSWORD})
        assert r.status_code == 200


# ---------------- Auth: /me ----------------
class TestAuthMe:
    def test_me_with_token(self, api, admin_token):
        r = api.get(f"{BASE_URL}/api/auth/me", headers={"Authorization": f"Bearer {admin_token}"})
        assert r.status_code == 200
        data = r.json()
        assert data.get("email") == ADMIN_EMAIL
        assert data.get("role") == "admin"

    def test_me_without_token(self, api):
        r = requests.get(f"{BASE_URL}/api/auth/me")
        assert r.status_code == 401

    def test_me_invalid_token(self, api):
        r = requests.get(f"{BASE_URL}/api/auth/me", headers={"Authorization": "Bearer not-a-real-jwt"})
        assert r.status_code == 401


# ---------------- Enquiries: protected list ----------------
class TestEnquiriesProtected:
    def test_list_without_token(self, api):
        r = requests.get(f"{BASE_URL}/api/enquiries")
        assert r.status_code == 401

    def test_list_with_invalid_token(self, api):
        r = requests.get(f"{BASE_URL}/api/enquiries", headers={"Authorization": "Bearer bogus"})
        assert r.status_code == 401

    def test_list_with_token(self, api, admin_token):
        r = requests.get(f"{BASE_URL}/api/enquiries", headers={"Authorization": f"Bearer {admin_token}"})
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        # If any items, verify no ObjectId leak and required fields present
        for it in data[:3]:
            assert "_id" not in it
            assert "id" in it and "full_name" in it and "phone" in it


# ---------------- Enquiries: public create ----------------
class TestEnquiryCreate:
    def test_create_public_no_auth(self, api):
        payload = {
            "full_name": "TEST_Iteration2 User",
            "phone": "9999912345",
            "email": "test_iter2@example.com",
            "address": "TEST_ Address, Surat",
            "car_type": "5 Seater",
            "preferred_plan": "Monthly Plans - 5 Seater (₹999/month)",
            "preferred_time_slot": "Morning (7-10 AM)",
            "message": "TEST_ automated iter 2 test",
        }
        r = requests.post(f"{BASE_URL}/api/enquiries", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["full_name"] == payload["full_name"]
        assert data["car_type"] == "5 Seater"
        assert "id" in data
        # email_sent may be true if key valid; must at least be bool
        assert isinstance(data.get("email_sent"), bool)
        return data["id"]

    def test_create_invalid_car_type(self, api):
        payload = {
            "full_name": "TEST_ Invalid Car",
            "phone": "9999912345",
            "address": "Somewhere",
            "car_type": "10 Seater",
            "preferred_plan": "X",
            "preferred_time_slot": "Y",
        }
        r = requests.post(f"{BASE_URL}/api/enquiries", json=payload)
        assert r.status_code == 400

    def test_create_persisted_and_visible_to_admin(self, api, admin_token):
        payload = {
            "full_name": "TEST_Persist Check",
            "phone": "9998887771",
            "address": "TEST_ Persist Addr",
            "car_type": "7 Seater",
            "preferred_plan": "Weekly Plans - 7 Seater",
            "preferred_time_slot": "Evening",
        }
        r = requests.post(f"{BASE_URL}/api/enquiries", json=payload)
        assert r.status_code == 200
        created = r.json()

        r2 = requests.get(f"{BASE_URL}/api/enquiries", headers={"Authorization": f"Bearer {admin_token}"})
        assert r2.status_code == 200
        ids = [x["id"] for x in r2.json()]
        assert created["id"] in ids
