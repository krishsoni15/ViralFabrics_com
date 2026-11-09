# VIRAL FABRICS — SYSTEM ARCHITECTURE & DESIGN

**Last Updated:** November 9, 2026  
**Auditor:** Full-Stack Architect  

---

## 1. Architectural Philosophy

Viral Fabrics combines high-performance server-rendered Next.js pages with luxury client-side editorial interactions. The application is designed around three architectural pillars:

1. **Resilient Data Sourcing (Hybrid Tier):** Dynamic catalog data is ingested from MongoDB Atlas via Mongoose with an automatic, zero-crash fallback to static verified fabric specifications.
2. **Kinetic Luxury UI:** Ultra-smooth GSAP directional character unblur entrance sweeps and Lenis inertial scrolling provide an haute-couture aesthetic without causing layout shifts (CLS = 0).
3. **Hardened Edge Security:** Native Next.js App Router headers enforce strict transport security, cross-origin protections, and sliding-window rate limiting on public form submissions.

---

## 2. High-Level System Architecture Diagram

```
[ User Browser / Search Engine Crawler ]
                   │
                   ▼
     [ Cloudflare / Reverse Proxy / SSL ]
                   │  (HSTS, Anti-DDoS, Security Headers)
                   ▼
        [ Next.js 16 App Router ]
      ┌────────────┴────────────┐
      ▼                         ▼
[ Server Components ]    [ Route Handlers (APIs) ]
 (SSR / SSG / ISR)        (/api/fabrics, /api/enquiry)
      │                         │
      │   ┌─────────────────────┤
      │   │ Rate Limiting Check │
      │   │ (lib/rateLimit.ts)  │
      ▼   ▼                     ▼
[ Fabrics Service Layer (lib/fabricsService.ts) ]
      │
      ├──► MongoDB Atlas (via cached Mongoose connection)
      │      └── Collection: `websitefabrics`
      │
      └──► Fallback Static Catalogue (`data/fabrics.ts`)
             (Guarantees 100% uptime if database is unreachable)
```

---

## 3. Server vs. Client Component Boundaries

| Module | Component Type | Justification |
| :--- | :--- | :--- |
| `app/layout.tsx` | Server Component | Pre-renders fonts, metadata, and JSON-LD schema into initial HTML stream |
| `app/fabrics/page.tsx` | Server Component | Fetches static fabric inventory with 10s ISR (`revalidate = 10`) |
| `app/fabrics/[slug]/page.tsx` | Server Component | Server-side metadata generation and JSON-LD Product schema generation |
| `app/about-us/layout.tsx` | Server Component | Route-specific metadata, OpenGraph cards, and canonical URL tags |
| `app/contact-us/layout.tsx` | Server Component | Route-specific metadata and canonical tag |
| `components/Navbar.tsx` | Client Component | Uses `services/fabricsApi` to sync live fabric links with mobile drawer |
| `components/contact/ContactQrModal.tsx` | Client Component | Accessible mobile QR code generation dialog with `Escape` listener |
| `components/contact/LogisticsTransitGrid.tsx` | Presentational Component | Pure UI grid rendering connectivity metrics (STV Airport, Port, Rail) |
| `components/FabricsCatalogClient.tsx` | Client Component | Real-time search query filtering and 2-in-1 enquiry modal interaction |
| `components/WhoWeAreSection.tsx` | Client Component | Scroll-linked GSAP text reading wave and animated numerical counters |
| `components/SmoothScrollProvider.tsx`| Client Component | Initializes Lenis smooth scrolling requestAnimationFrame loop |

---

## 4. Layered Separation of Concerns

The architecture strictly enforces clean separation between application tiers:

1. **Presentation Layer (`components/`, `app/`):** React components focused exclusively on UI presentation, user interactions, and CSS animations.
2. **Client API Services Layer (`services/`):** Strongly-typed asynchronous abstraction layer (`fabricsApi.ts`, `enquiryApi.ts`) isolating raw HTTP calls from UI components.
3. **Domain Type System (`types/`):** Centralized TypeScript definitions (`FabricItem`, `LiveFabric`, `CompanyInfo`, `EnquiryPayload`, `EnquiryResponse`) ensuring strict end-to-end contracts.
4. **Data Access & Persistence (`lib/`, `models/`):** Mongoose schemas, cached database connections, and sliding-window rate limiters.
5. **Static Master Data (`data/`):** Curated single sources of truth for company coordinates and offline catalog fallback.

---

## 4. Data Layer & Resilience Pattern

```typescript
// lib/fabricsService.ts
export async function getPublishedFabrics(): Promise<LiveFabric[]> {
  try {
    await connectDB();
    const docs = await WebsiteFabric.find({ isPublished: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    if (docs && docs.length > 0) {
      return docs.map(mapToLiveFabric);
    }
  } catch (error) {
    console.warn('[Fabrics Service] Falling back to static catalogue:', error);
  }

  // Guaranteed fallback ensures zero 500 errors during database downtime
  return FABRICS.map(...);
}
```

---

## 5. Security Architecture

1. **Zero Secret Leakage:** No database credentials or internal API tokens exist in client bundles or source files.
2. **Rate Limiting:** Sliding-window rate limiting in memory isolates IP addresses to prevent brute force or form flooding.
3. **Strict Validation:** Every string field is sanitized and checked against strict regex patterns (email, phone, text length).

