# Keshav Marketplace — Global Logistics Website

## Original Problem Statement
Build a modern, responsive, single-page Next.js website using React and Tailwind CSS (all code in a single file) for a global logistics company (Keshav Marketplace).

- Brand color: #225c4a on clean white
- Highly professional, beginner-friendly UI
- Contact email: admin@keshavmarketplace.com.au

## Tech Stack
- **Framework:** Next.js 14 (Pages Router)
- **UI:** React 18, Tailwind CSS 3, Lucide-React icons
- **Fonts:** Fraunces (display) + Plus Jakarta Sans (body) via Google Fonts
- **All page code lives in a single file:** `/app/frontend/pages/index.js`

## User Personas
- First-time importers (zero logistics knowledge)
- SMB owners moving goods China ↔ Australia and India ↔ Australia
- 3PL / cold-chain clients in Australia

## Core Requirements (Static)
1. Hero section with China↔Australia + India↔Australia messaging and "Get a Free Quote" CTA
2. Stats row: 5,000+ Clients · 100k+ Shipments · 24/7 Support · 100% Customer Focus
3. Four core service cards (LCL, FCL, Storage, Logistics) each with "Talk with Expert" + "Get a Free Quote" buttons
4. Beginner-friendly Why-Choose-Us (offices in India/China/Australia, hand-to-hand, zero-hassle paperwork)
5. Expert Food & Beverage content section (6 permitted categories)
6. Dynamic Quote form with 6 tabbed services (FCL, LCL, Air, 3PL, Supplier Sourcing, Transport) + optional file upload
7. Import Consultation banner (no form) with "Contact Us" button

## What's Been Implemented (2026-01-14)
- Full single-file Next.js page with all 7 sections
- Custom brand palette + refined typography (Fraunces italic accents on green #225c4a)
- Sticky nav with mobile menu, marquee route ticker, floating stat card on hero
- 6-service dynamic quote form with per-service required fields, file-upload dropzone with previews, success banner
- Import consultation banner with contact CTA and admin@keshavmarketplace.com.au
- Fully responsive (mobile → desktop), lucide-react icons throughout, data-testid on all interactive elements

## Files
- `/app/frontend/pages/index.js` — Single-file page (all sections)
- `/app/frontend/pages/_app.js` — Global styles + head meta
- `/app/frontend/styles/globals.css` — Tailwind + custom animations
- `/app/frontend/tailwind.config.js` — Brand tokens
- `/app/frontend/package.json` — Next 14.2.5, React 18, lucide-react, tailwind

## Backlog / Future
- P1: Wire quote form to a backend endpoint + email notifications
- P2: Live shipment tracking module
- P2: Multilingual switch (EN / 中文 / हिंदी)
- P2: Blog / Insights section for SEO
