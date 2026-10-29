# Winter ARC Pro — Commercial React Website

This directory contains the production React commercial website and customer platform for **Winter ARC Pro**, the Windows desktop productivity application.

## Key Features

- **Marketing Landing Page (`/`)**: Hero section, Windows compatibility badges, core pillars, interactive desktop feature previews, and Free vs. Pro comparison.
- **Authentic Desktop Features (`/features`)**: Complete showcase of all 13 native desktop modules mapped directly from the Java 21 / JavaFX desktop client source code.
- **Authoritative Pricing Matrix (`/pricing`)**: Server-backed plan catalog featuring:
  - **Free Edition**: ₹0 (up to 5 habits, full offline SQLite capability)
  - **Pro Plan A**: ₹50.00 (5000 paise), 30-day default cycle
  - **Pro Plan B**: ₹100.00 (10000 paise), 90-day winter arc challenge cycle
  - Clear disclosure of billing duration terms pending final business determination.
- **Official Download Portal (`/download`)**: Direct distribution of the verified Windows MSI installer (`Winter ARC Pro-1.0.1.msi`, 76.4 MB) with SHA-256 integrity verification instructions (`96374a521f746bd238eadb0a94b6934ebe4ae92cd7ebc615dda081400cc770c2`).
- **Setup & Activation Guide (`/guide`)**: 5-step visual walkthrough for installing the MSI package, launching the client, and synchronizing offline Ed25519 license tokens.
- **Razorpay Checkout Integration**: Secure checkout modal powered by Razorpay's JavaScript SDK and backend HMAC-SHA256 signature verification.
- **Account & Entitlements Dashboard (`/account`)**: Real-time subscription status, token export for isolated offline machines, and transaction history.
- **Legal & Support Suite**: Privacy Policy (`/privacy`), Terms of Service (`/terms`), Refund Policy (`/refund`), Contact Form (`/contact`), and FAQ (`/faq`).

---

## Tech Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript 5.5.4
- **Build Tool**: Vite 5.4.6
- **Styling**: Tailwind CSS 3.4.12
- **Icons**: Lucide React 0.446.0
- **Routing**: React Router 6.26.2
- **Testing**: Vitest 2.1.1 & React Testing Library 16.0.1

---

## Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node 24.14.0)
- npm 9+ (tested on npm 11.9.0)

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure your environment variables:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
VITE_SITE_URL=http://localhost:5173
```

### 4. Development Server
```bash
npm run dev
```
The website will start at `http://localhost:5173/`. All `/api/*` requests will be proxied to `http://localhost:8080/`.

### 5. Running Tests
```bash
npm test -- --run
```
Runs 12 unit and integration tests across 6 test suites with Vitest.

### 6. Production Build
```bash
npm run build
```
Type checks the project and bundles optimized static assets into `dist/`.

---

## Deployment

The website can be deployed independently as a static SPA on Vercel, Netlify, or any static hosting platform:

- **Vercel**: Pre-configured with `vercel.json` for SPA rewrites.
- **Netlify**: Pre-configured with standard single-page app redirects.
- **Docker / Nginx**: See `docs/deployment.md` for Nginx reverse-proxy configuration.
