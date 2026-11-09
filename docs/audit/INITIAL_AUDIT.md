# VIRAL FABRICS — INITIAL ENGINEERING AUDIT & CODEBASE DISCOVERY

**Date:** November 9, 2026  
**Auditor:** Senior Staff Software Engineer & Full-Stack Architect  
**Repository:** Viral Fabrics Web Platform (`viralfabrics-web`)  
**Status:** Baseline Established  

---

## 1. Executive Summary

Viral Fabrics is an export-grade synthetic textile manufacturer based in Surat, Gujarat, India, producing ~600,000 meters/month of high-speed water-jet weaves (BSY, Satin, Chiffon, Georgette, Crepe, Poly Dobby, Recycled PET). The web platform is a modern Next.js App Router application built with React 19, TypeScript, Tailwind CSS, GSAP, and Mongoose for MongoDB Atlas data integration.

While the frontend visual presentation and GSAP animation layer are sophisticated, the codebase exhibits critical security exposures, zero automated test coverage, unorganized media assets, missing security headers, disabled Next.js image optimization, and lack of API rate-limiting or server-side anti-spam verification.

---

## 2. Architecture & Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack) | `16.4.3` | Full-stack server/client framework |
| **UI Library** | React | `19.0.0` | Core UI runtime |
| **Language** | TypeScript | `5.7.3` | Type safety and schema typing |
| **Styling** | Tailwind CSS + PostCSS | `3.4.17` | Utility-first responsive styling |
| **Animation** | GSAP | `3.15.1` | Directional unblur, entrance sweeps & scroll triggers |
| **Smooth Scroll** | Lenis | `1.3.27` | Inertial momentum scrolling |
| **Database** | MongoDB Atlas via Mongoose | `9.11.4` | Dynamic website fabrics catalog |
| **Icons** | Lucide React | `0.475.0` | Modern SVG iconography |
| **Utilities** | clsx, tailwind-merge, qrcode | Latest | Styling and QR generation |

---

## 3. Repository Structure

```
ViralFabrics_com-main/
├── app/                        # Next.js App Router
│   ├── about-us/page.tsx       # Company heritage, capabilities, team, specs
│   ├── api/                    # Serverless route handlers
│   │   ├── enquiry/route.ts    # Lead capture & contact submission
│   │   └── fabrics/route.ts    # JSON API for published fabrics
│   ├── contact-us/             # Surat facility contacts & map QR generators
│   ├── enquiry/                # Sample request & tech pack inquiry form
│   ├── fabrics/                # Fabric catalog grid & detail pages [slug]
│   ├── network/                # Global export routes & distribution map
│   ├── globals.css             # Global typography, animations & scrollbar rules
│   ├── layout.tsx              # Root layout, Google Fonts & JSON-LD metadata
│   ├── page.tsx                # Hero stacking parallax & haute-couture homepage
│   ├── robots.ts               # Search engine crawl directives
│   └── sitemap.ts              # Dynamic XML sitemap generator
├── components/                 # Reusable React components
│   ├── FabricDetailClient.tsx  # Dynamic fabric specification display
│   ├── FabricsCatalogClient.tsx# Filterable catalog grid with 2-in-1 modal
│   ├── FabricsPortfolioSection.tsx # Homepage interactive fabric showcase
│   ├── Footer.tsx              # Global footer with quick links & certifications
│   ├── Navbar.tsx              # Luxury navigation bar with backdrop blur
│   ├── PageHeroBanner.tsx      # Consistent hero banner with video/poster
│   ├── QualityPracticesSection.tsx # 4-stage quality audit pipeline
│   ├── SmoothScrollProvider.tsx# Lenis smooth-scroll provider
│   ├── TestimonialsSection.tsx # Global export client reviews
│   └── WhoWeAreSection.tsx     # Craftsmanship manifesto & live counter metrics
├── data/                       # Static catalogue fallback & company constants
│   ├── company.ts              # Surat addresses, phones, emails, social links
│   └── fabrics.ts              # Complete static specifications for 10 fabrics
├── lib/                        # Infrastructure & services
│   ├── fabricsService.ts       # Hybrid MongoDB + Static fallback data accessor
│   └── mongodb.ts              # Cached Mongoose connection helper
├── models/                     # Mongoose schema definitions
│   └── WebsiteFabric.ts        # Dynamic fabric document model
├── public/                     # Static media, videos, posters, brand marks
└── package.json                # Project dependencies and npm scripts
```

---

## 4. Identified Technical Debt & Critical Issues

### 4.1 Security Vulnerabilities (Severity: HIGH)
1. **Hardcoded MongoDB Atlas Credentials:**  
   `lib/mongodb.ts` contained a hardcoded fallback connection string with plaintext database credentials (`krish1509soni:mqYQZaMl2qjtNkWL...`). This is an immediate credential exposure risk.
2. **Missing Security Headers:**  
   `next.config.mjs` lacked basic HTTP security headers (`Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`).
3. **No Rate Limiting on Lead Endpoints:**  
   `/api/enquiry` accepted unbounded POST requests without rate-limiting, exposing the mailer/database to spam floods.
4. **Unverified Client-Side reCAPTCHA:**  
   `app/enquiry/page.tsx` included a static Google reCAPTCHA site key without server-side token validation in `/api/enquiry/route.ts`.

### 4.2 Asset Bloat & Unorganized Files (Severity: MEDIUM)
1. **Loose Media Files in Root Directory:**  
   A 2.4MB file (`Deep Blue Fabric Rolls on Pallet.png`) was placed directly in the repository root.
2. **Untracked / Unreferenced Generated Videos in `public/`:**  
   Several generated AI test videos (e.g., `Generated Video November 08, 2026 - 5_59PM.mp4`, `Video Project 1.mp4`) exist unreferenced in source code, consuming tens of megabytes.
3. **Disabled Next.js Image Optimization:**  
   `next.config.mjs` had `images: { unoptimized: true }`, forcing browsers to download raw uncompressed images without responsive AVIF/WebP srcset generation.

### 4.3 Testing Deficiencies (Severity: HIGH)
1. **Zero Test Coverage:**  
   There were 0 unit tests, 0 integration tests, and 0 end-to-end tests.
2. **No Test Framework Configured:**  
   Neither Vitest nor Jest was installed in `package.json`.

### 4.4 Documentation & Maintainability (Severity: MEDIUM)
1. **Missing Documentation:**  
   The project had no architecture guide, API docs, database schema reference, deployment guide, or security policies.
2. **Unused Functions & Redundant Fallbacks:**  
   Multiple unused helper functions and duplicate font loaders loaded unnecessary CSS weight.

---

## 5. Action Plan & Phased Roadmap

1. **Phase 1: Bug Fixing & Functionality Audit**
   - Sanitize `lib/mongodb.ts` to strictly consume `process.env.MONGODB_URI` without leaking credentials.
   - Harden `/api/enquiry` with input sanitization, rate-limiting, and robust error handling.
   - Audit all page routes and interactive elements for hydration and responsive issues.
2. **Phase 2: Codebase Reorganization & Asset Management**
   - Move loose, unreferenced assets into a documented `quarantine/` folder.
   - Create comprehensive asset inventory in `docs/ASSET_MANAGEMENT.md`.
3. **Phase 3: Professional Documentation Suite**
   - Create complete markdown documentation in `docs/`.
4. **Phase 4: Automated Testing & QA**
   - Install and configure Vitest and React Testing Library.
   - Write comprehensive unit and integration tests for services, APIs, and components.
5. **Phase 5: Performance Optimization**
   - Enable Next.js image optimization, configure caching headers, tune font loading.
6. **Phase 6: Complete SEO Optimization**
   - Verify JSON-LD schemas, OpenGraph tags, sitemaps, robots.txt, and metadata.
7. **Phase 7: Security Audit & Hardening**
   - Add security headers in `next.config.mjs`, rate limiting, and input sanitization.
8. **Phase 8: Responsive Design & Accessibility**
   - Verify viewports, keyboard navigation, contrast, and ARIA labels.
9. **Phase 9: Production Readiness & Verification**
   - Verify clean build, zero secret leakage, and output `docs/audit/FINAL_AUDIT.md`.

