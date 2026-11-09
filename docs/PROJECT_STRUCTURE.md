# VIRAL FABRICS — PROJECT STRUCTURE & DIRECTORY MAP

**Last Updated:** November 9, 2026  
**Auditor:** Full-Stack Architect  

---

```
ViralFabrics_com-main/
├── .env.example                # Clean template for required environment variables
├── .gitignore                  # Git exclusions (quarantine, node_modules, build artifacts)
├── next.config.mjs             # Next.js configuration, security headers & image optimization
├── package.json                # Dependencies, testing scripts & project metadata
├── postcss.config.js           # PostCSS Tailwind CSS processor config
├── tailwind.config.js          # Brand palette (#006DB6, #0A192F), typography & keyframes
├── tsconfig.json               # TypeScript strict configuration and paths (@/*)
├── vitest.config.mjs           # Automated test runner configuration with JSDOM
│
├── app/                        # Next.js App Router (File-based Routing)
│   ├── about-us/
│   │   ├── layout.tsx          # Server layout with About Us SEO metadata & OpenGraph
│   │   └── page.tsx            # Heritage, capabilities, team & company specifications bar
│   ├── api/
│   │   ├── enquiry/
│   │   │   └── route.ts        # POST: Sanitized, rate-limited lead capture API
│   │   └── fabrics/
│   │       └── route.ts        # GET: Public JSON catalogue of published fabrics
│   ├── contact-us/
│   │   ├── layout.tsx          # Server layout with Contact Us SEO metadata
│   │   ├── page.tsx            # Contact page entrypoint
│   │   └── ContactClient.tsx   # QR code generators, Surat plant contacts & maps
│   ├── enquiry/
│   │   ├── layout.tsx          # Server layout with Enquiry SEO metadata
│   │   └── page.tsx            # Interactive sample request & tech pack inquiry form
│   ├── fabrics/
│   │   ├── [slug]/
│   │   │   └── page.tsx        # Dynamic fabric detail page with Product JSON-LD
│   │   └── page.tsx            # Fabrics portfolio catalog overview
│   ├── network/
│   │   ├── layout.tsx          # Server layout with Network SEO metadata
│   │   └── page.tsx            # Global export corridors & flight corridor showcase
│   ├── globals.css             # Tailwind base, utilities, font variables & custom animations
│   ├── layout.tsx              # Root HTML layout, Organization & WebSite JSON-LD schemas
│   ├── page.tsx                # Haute-couture pinned hero & home stacking sections
│   ├── robots.ts               # Automated search engine robots.txt generator
│   └── sitemap.ts              # Automated dynamic XML sitemap generator
│
├── components/                 # Reusable Client & Server React Components
│   ├── contact/                # Decomposed Contact Subcomponents
│   │   ├── ContactQrModal.tsx  # Accessible mobile QR code generation dialog
│   │   └── LogisticsTransitGrid.tsx # Transit credentials (STV Airport, Hazira Port, Rail)
│   ├── FabricDetailClient.tsx  # Interactive technical specifications & swatch preview
│   ├── FabricsCatalogClient.tsx# Filterable catalog cards with 2-in-1 enquiry modal
│   ├── FabricsPortfolioSection.tsx # Homepage interactive fabric portfolio showcase
│   ├── Footer.tsx              # Global footer with Surat plant details, newsletter & legal
│   ├── Navbar.tsx              # Responsive navigation header with portal mobile drawer
│   ├── PageHeroBanner.tsx      # Consistent hero banner with video background & badges
│   ├── QualityPracticesSection.tsx # 4-audit inspection pipeline (Greige, Finished, etc.)
│   ├── SmoothScrollProvider.tsx# Lenis smooth-scroll provider
│   ├── TestimonialsSection.tsx # Verified international client export testimonials
│   └── WhoWeAreSection.tsx     # Craftsmanship manifesto, founder quote & animated metrics
│
├── services/                   # Typed Client API Abstraction Layer
│   ├── fabricsApi.ts           # Client gateway for fetching published fabrics
│   └── enquiryApi.ts           # Client gateway for submitting procurement inquiries
│
├── types/                      # Centralized Domain TypeScript Types
│   ├── fabric.ts               # FabricItem, LiveFabric, FabricDocumentLike
│   ├── company.ts              # CompanyInfo, QualityStage
│   ├── enquiry.ts              # EnquiryPayload, EnquiryResponse
│   ├── global.d.ts             # Global Window extensions (Lenis)
│   └── index.ts                # Centralized domain export barrel
│
├── data/                       # Verified Static Data Models & Constants
│   ├── company.ts              # Registered address, phones, emails & quality stages
│   └── fabrics.ts              # Complete static catalogue for 10 core fabric qualities
│
├── docs/                       # Comprehensive Engineering Documentation
│   ├── audit/
│   │   ├── INITIAL_AUDIT.md    # Baseline repository discovery & security findings
│   │   ├── FINAL_AUDIT.md      # Phase 1 final audit report & verification metrics
│   │   ├── PHASE_2_VERIFICATION.md # Phase 2 independent verification report
│   │   ├── ARCHITECTURE_REVIEW.md  # System architecture & component topology review
│   │   └── FINAL_CODE_QUALITY.md   # Final TypeScript strictness & quality conformance
│   ├── ARCHITECTURE.md         # System design, data flow & component boundaries
│   ├── ASSET_INVENTORY.md      # Exhaustive production asset inventory & classifications
│   ├── ASSET_MANAGEMENT.md     # Media inventory, preservation rules & quarantine log
│   ├── API_DOCUMENTATION.md    # REST API contracts, payloads & rate-limiting
│   ├── DATABASE_SCHEMA.md      # Mongoose models & MongoDB Atlas specifications
│   ├── DEPLOYMENT.md           # Hosting guides (Vercel, Docker, VPS)
│   ├── DEVELOPMENT_SETUP.md    # Developer onboarding, toolchain & debugging
│   ├── ENVIRONMENT_VARIABLES.md# Environment configuration dictionary
│   ├── PERFORMANCE.md          # Core Web Vitals, asset optimization & caching
│   ├── PROJECT_STRUCTURE.md    # Codebase directory layout (this file)
│   ├── README.md               # Documentation suite table of contents
│   ├── SECURITY.md             # OWASP Top 10 mitigations & security headers
│   ├── SEO.md                  # Technical SEO, canonicals & Schema.org JSON-LD
│   └── TESTING.md              # Vitest test runner guide & test suite breakdown
│
├── lib/                        # Core Utilities & Services
│   ├── fabricsService.ts       # Hybrid database + static fallback data accessor
│   ├── mongodb.ts              # Cached Mongoose connection helper
│   └── rateLimit.ts            # Sliding-window in-memory IP rate limiter
│
├── models/                     # Mongoose Schemas
│   └── WebsiteFabric.ts        # Database model for dynamic fabric documents
│
├── public/                     # Static Web Assets (Preserved Production Media)
│   ├── assets/                 # Brand marks, favicons, logos & legacy uploads
│   ├── images/                 # High-resolution background canvases & team photography
│   └── videos/                 # Autoplaying background video reels & audit micro-clips
│
├── quarantine/                 # Local Documented Quarantine for Unreferenced Assets
│   └── (109.6 MB of unreferenced scratch videos & loose PNGs preserved safely)
│
└── test/                       # Automated Test Suite (Vitest + Testing Library)
    ├── components/             # React component unit tests (Navbar, Footer)
    ├── integration/            # API integration tests (/api/enquiry, /api/fabrics)
    ├── setup.ts                # JSDOM matchers setup (@testing-library/jest-dom)
    └── unit/                   # Unit tests (rate limiting, data services, integrity)
```

