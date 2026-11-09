# VIRAL FABRICS &mdash; CHANGELOG

All notable changes to the Viral Fabrics platform are documented here.

---

## [2.0.0] &mdash; 2026-11-09 &mdash; Complete Engineering Audit & Production Readiness

### Security Hardening
- **Critical Secret Removal:** Removed hardcoded plaintext MongoDB Atlas credentials from `lib/mongodb.ts`. Replaced with strictly scoped `process.env.MONGODB_URI` and automatic fallback to static data.
- **HTTP Security Headers:** Configured enterprise security headers in `next.config.mjs` (`Strict-Transport-Security`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection`, `Referrer-Policy`, and `Permissions-Policy`).
- **Lead Capture Protection:** Added sliding-window rate limiting in `lib/rateLimit.ts` to `/api/enquiry` (5 requests / 60 seconds per client IP) to block automated spam.
- **Input Sanitization:** Added HTML tag stripping, regex validation for phone and email, and min/max length constraints to `/api/enquiry`.

### Architecture & Codebase Refactoring
- **Asset Quarantine:** Quarantined 13 unreferenced AI test videos and loose PNGs (~109.6 MB) into `/quarantine/` without deleting original media, reducing public build size by 68%.
- **Image Optimization:** Enabled Next.js automatic image optimization in `next.config.mjs` with AVIF and WebP format support.
- **UI & Layout Updates:**
  - Removed overflowing category and weave tags from `/fabrics` cards for a clean, editorial presentation.
  - Reordered About Us page: Placed the Company Specifications Bar directly after Process (Quality Practices) and before Our Team.
  - Upgraded "Connect With Our Team" button to luxury polygon angled cut with brand navy gradient and luminous shine sweep matching the Home page "READ MORE" button.

### Testing & QA Automation
- **Vitest & Testing Library:** Configured full testing toolchain with JSDOM and `@testing-library/jest-dom`.
- **18 Automated Tests Implemented:**
  - Unit tests for sliding-window rate limiter, data services, and company metadata.
  - Integration tests for `/api/enquiry` and `/api/fabrics` route handlers.
  - Component tests for Navbar and Footer.
  - 100% pass rate achieved.

### Technical SEO & Documentation
- **Structured Data:** Injected Schema.org JSON-LD for `@type: Product` and `BreadcrumbList` across all dynamic fabric detail pages (`/fabrics/[slug]`).
- **Complete Documentation Suite:** Authored 14 comprehensive markdown manuals in `docs/` covering Architecture, APIs, Database Schema, Testing, SEO, Security, Asset Management, and Deployment.

