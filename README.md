# Viral Fabrics &mdash; Export Synthetic Textile Manufacturer

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-22%2F22%20Passing-brightgreen?logo=vitest)](https://vitest.dev/)
[![Security](https://img.shields.io/badge/Security-Hardened%20(OWASP)-success)](docs/SECURITY.md)

Premier web application and digital product showcase for **Viral Fabrics Pvt. Ltd.** &mdash; manufacturer and supplier of export-grade synthetic fabrics based in Surat, Gujarat, India. Operating high-speed continuous water-jet loom sheds producing **600,000+ meters per month** of BSY, Poly Dobby, Satin, Chiffon, Georgette, Crepe, Recycled PET, and Viscose fabrics on a Make-to-Order basis.

---

## Quick Start

### Prerequisites
- **Node.js:** `v20.x` or `v22.x` (LTS recommended, verified on `v26.x`)
- **Package Manager:** `npm` (v10+)

### 1. Installation
```bash
git clone <repository-url>
cd ViralFabrics_com-main
npm install
```

### 2. Environment Setup
Copy the environment template:
```bash
cp .env.example .env.local
```
Configure your environment variables in `.env.local`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
DATABASE_NAME=CRM_AdminPanel
NEXT_PUBLIC_SITE_URL=https://viralfabrics.com
```
*(Note: If `MONGODB_URI` is omitted, the application automatically falls back to the static catalogue in `data/fabrics.ts` with zero crashes).*

### 3. Local Development
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

### 4. Running Tests & Quality Gates
```bash
# Run unit & integration tests
npm test

# Type-check TypeScript codebase
npm run lint

# Compile production build
npm run build
```

---

## Key Features

- **Haute-Couture Editorial Design:** Directional unblur character animations, stacked parallax canvas sections, and smooth inertial momentum scrolling powered by Lenis and GSAP.
- **Dynamic & Static Hybrid Catalog:** Live MongoDB Atlas synchronization with seamless fallback to static verified fabric specifications.
- **2-in-1 Quick Enquiry:** Instant WhatsApp direct messaging and structured web contact forms with real-time phone and email format validation.
- **Production Hardened:** Strict HTTP security headers, sliding window rate-limiting on lead capture endpoints, and sanitized inputs.
- **Technical SEO Ready:** Automated dynamic XML sitemap generation (`/sitemap.xml`), robots directives (`/robots.txt`), OpenGraph meta cards, and Schema.org JSON-LD (`Organization`, `WebSite`, `Product`, `BreadcrumbList`).

---

## Documentation System

Comprehensive technical specifications and engineering guides are available in the [`docs/`](docs/) directory:

- [**System Architecture**](docs/ARCHITECTURE.md) &mdash; Technology stack, data flow, and component boundaries.
- [**Architecture Review (Phase 2)**](docs/audit/ARCHITECTURE_REVIEW.md) &mdash; Layer separation, component decomposition, and domain model mapping.
- [**Final Code Quality Report**](docs/audit/FINAL_CODE_QUALITY.md) &mdash; Strict TypeScript, 0 any types, error handling, and test metrics.
- [**Phase 2 Independent Verification**](docs/audit/PHASE_2_VERIFICATION.md) &mdash; Independent verification of Phase 1 audit claims and fixes.
- [**Production Asset Inventory**](docs/ASSET_INVENTORY.md) &mdash; Exhaustive inventory of all production assets, sizes, and usages.
- [**Project Structure**](docs/PROJECT_STRUCTURE.md) &mdash; Detailed directory map and organization.
- [**Development Setup**](docs/DEVELOPMENT_SETUP.md) &mdash; Local environment configuration, scripts, and debugging.
- [**Environment Variables**](docs/ENVIRONMENT_VARIABLES.md) &mdash; Full reference of required and optional keys.
- [**API Documentation**](docs/API_DOCUMENTATION.md) &mdash; REST endpoint contracts, payloads, and rate limits.
- [**Database Schema**](docs/DATABASE_SCHEMA.md) &mdash; Mongoose models and field definitions.
- [**Asset Management**](docs/ASSET_MANAGEMENT.md) &mdash; Media preservation rules and quarantine log.
- [**Automated Testing**](docs/TESTING.md) &mdash; Vitest test suites, component testing, and coverage reports.
- [**Performance Optimization**](docs/PERFORMANCE.md) &mdash; Core Web Vitals, code-splitting, and asset delivery.
- [**Technical SEO Guide**](docs/SEO.md) &mdash; Structured data, canonicals, and search engine directives.
- [**Security Policy & Audit**](docs/SECURITY.md) &mdash; OWASP alignment, headers, sanitization, and secrets.
- [**Deployment Guide**](docs/DEPLOYMENT.md) &mdash; Production deployment instructions for Vercel, VPS, and Docker.
- [**Initial Audit Report**](docs/audit/INITIAL_AUDIT.md) &mdash; Baseline repository findings and technical debt.
- [**Phase 1 Final Audit Report**](docs/audit/FINAL_AUDIT.md) &mdash; Completed refactoring and verification summary.

---

## License & Intellectual Property

&copy; 2012&ndash;2026 Viral Fabrics Pvt. Ltd. All rights reserved.  
Surat, Gujarat, India.
