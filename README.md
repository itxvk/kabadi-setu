# ♻️ KabadiSetu

**Fair price. Trusted recyclers. Paperwork done for you.**
सही दाम। भरोसेमंद रिसाइक्लर। सारा रिकॉर्ड अपने आप।

KabadiSetu is a bilingual/trilingual web platform that connects informal waste collectors (**kabadiwalas**) with **authorized recyclers**, bringing transparent pricing, digital record-keeping, and safety guidance to India's scrap collection economy. Built for **SIH PS 26229**.

---

## 🧩 What it does

KabadiSetu has two linked front ends sharing one login:

### 🧺 Kabadiwala (Collector) App — `index.html`
A mobile-first PWA-style app for scrap collectors to:
- **Check today's fair prices** for e-waste categories (CRT/LCD monitors, PCBs, cables, batteries, motors, mixed plastic) from a transparent rate table
- **Create a new lot** in 4 quick steps — pick category → photo → weigh → confirm
- **Track every lot** from draft → quoted → matched → handed over → completed
- **Match with nearby recyclers**, with clear ✓ Authorized / ⚠ Not Authorized badges (E-Waste Rules 2022 aware) and pickup-vs-drop-off info
- **Record handovers digitally** — reference ID, GPS location, timestamp, shareable via WhatsApp
- **Track earnings** in a ledger — pending dues vs. paid transactions
- **Get safety guidance** on handling batteries, CRTs, cables, and PCBs (with text-to-speech "Listen" support)
- Work **offline-first**, syncing lots once back online
- Full **Hindi / Marathi / English** language support

### 🏭 Recycler Dashboard — `kabadisetu-recycler.html`
A desktop-style console for authorized recyclers to run their side of the business:
- **Overview** — new requests, active pickups, monthly weight collected, monthly earnings, recent activity, and service areas at a glance
- **Requests** — accept or decline incoming pickup requests from collectors, filterable by status
- **Orders** — track scheduled vs. completed pickups, mark items as collected, view digital receipts
- **Payments** — see paid vs. pending amounts, mark payments as settled
- **Profile** — manage accepted material types and service areas
- **Live search** across requests, orders, and payments by name, locality, material, or ID
- **Availability toggle** to go online/offline for new requests

---

## ✨ Shared features

- 🌙 **Dark mode** on both pages — a single tap toggles theme, remembers your preference, and respects your system setting on first visit
- 🔐 **OTP-based login** with role selection (Kabadiwala vs. Recycler) — completing login as a Recycler automatically redirects to the recycler dashboard
- ⌨️ **Keyboard-first auth flow** — press **Enter** to send OTP, auto-focus on every input, and OTP auto-verifies the moment all 4 digits are typed (no extra clicks)
- 👤 **Persistent, lightweight session** — name and role are remembered locally so returning users skip straight to their dashboard
- 📱 Fully responsive — scales from a phone-width app to a full desktop console

---

## 🗂️ Project structure

```
kabadisetu/
├── index.html                # Kabadiwala (collector) app — markup
├── kabadisetuWeb.css         # Kabadiwala app — styles (incl. dark mode)
├── kabadisetuWeb.js          # Kabadiwala app — logic, i18n, auth, storage
└── kabadisetu-recycler.html  # Recycler dashboard (markup + styles + logic, self-contained)
```

---

## 🚀 Getting started

No build step, no dependencies — it's a static, client-side app.

1. Clone the repo
   ```bash
   git clone https://github.com/<your-username>/kabadisetu.git
   cd kabadisetu
   ```
2. Open `index.html` directly in a browser, **or** serve the folder locally:
   ```bash
   npx serve .
   ```
3. Pick a language → log in with any 10-digit number → OTP is shown in a toast for the demo (`1234`) → pick **Kabadiwala** or **Recycler** to land on the matching dashboard.

> Both pages share data via `localStorage`, so keep them in the same folder/origin for role-based redirect and session handoff to work.

---

## 🛠️ Tech stack

- **Vanilla HTML / CSS / JavaScript** — no frameworks, no build tools
- **localStorage** for offline-first, client-side persistence (lots, ledger, session, theme, language)
- **CSS custom properties** for theming (light/dark mode)
- **Web Speech API** for safety-guidance read-aloud
- **Geolocation API** for handover GPS capture

---

## 📌 Notes

- Prices and recycler listings are **illustrative demo data** for the prototype — a production build would pull live rates from a recycler-network backend.
- Photos captured during lot creation are intended to seed a future AI/ML material-classification model; this prototype uses a transparent rate-table valuation as an honest MVP baseline.
- Only minimal collector/recycler profile data is stored — no unnecessary personal data is collected.

---



Built for **Smart India Hackathon — Problem Statement 26229**.
