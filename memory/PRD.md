# CleanDrive – Product Requirements

## Original Problem Statement
Modern, single-page website for CleanDrive – a doorstep car cleaning service based in Surat, Gujarat.
USP: trained staff, premium cleaning liquid, nano polish (scratch-free) microfibre cloth, daily
morning doorstep service, eco-friendly and water-efficient.

## User Choices
- Enquiry handling: Save to DB + Resend email notification to business email
- Contact info: placeholders (+91 XXXXX XXXXX, info@cleandrive.in)
- Theme: Blue & white (trust + cleanliness) — implemented as high-contrast light theme with navy #0A2540 + brand blue #0066FF
- Admin: simple admin page + DB storage

## Architecture
- Backend: FastAPI + MongoDB (Motor). Routes prefixed `/api`.
  - `POST /api/enquiries` – create enquiry, persist to Mongo, trigger email
  - `GET /api/enquiries` – list all enquiries (admin)
  - `GET /api/` – health
- Email: Emergent-managed Resend proxy (`EMERGENT_EMAIL_KEY`, `EMAIL_FROM_NAME`, `NOTIFICATION_EMAIL` env vars)
- Frontend: React + Tailwind + shadcn/ui + framer-motion + sonner (toast) + lucide-react icons
  - `/` – Landing (Hero, WhyChooseUs, Process, Pricing, EnquiryForm, Footer)
  - `/admin` – enquiry dashboard (unauthenticated, DB read only)
- Fonts: Outfit (headings), Manrope (body)

## Personas
- Car owner in Surat wanting daily hassle-free doorstep car cleaning.
- Business admin checking incoming enquiries.

## What's implemented (2025-12)
- Landing page with all 6 sections and data-testid coverage
- Pricing tabs (5/7 seater) with 4 plan cards each, Choose Plan → pre-fills enquiry form via custom event
- Enquiry form with validation, sonner toasts, success screen
- Backend enquiry API with Mongo persistence + email notification (email_sent flag)
- Admin dashboard listing enquiries with status pill
- Fully passed automated backend + frontend tests (iteration_1)

## Backlog (P1)
- Replace phone/email placeholders with real business contact
- Admin authentication (JWT / basic)
- WhatsApp click-to-chat button
- SEO meta tags + OG image
- Testimonials section (social proof) for conversion

## Backlog (P2)
- Multi-language (Gujarati, Hindi)
- Payment integration (Razorpay/UPI) to accept plan upfront
- Customer portal to view schedule / skip a wash
