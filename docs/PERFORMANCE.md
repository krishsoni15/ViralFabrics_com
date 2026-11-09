# VIRAL FABRICS — PERFORMANCE ENGINEERING SPECIFICATION

**Last Updated:** November 9, 2026  
**Auditor:** Performance Engineer  

---

## 1. Overview & Core Web Vitals Targets

| Metric | Target | Optimization Applied |
| :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | `< 2.5s` | Optimized video posters, enabled Next.js AVIF/WebP image compression, priority preloading on hero photography. |
| **INP (Interaction to Next Paint)**| `< 200ms` | Zero React re-renders during scroll animation loops (`requestAnimationFrame` direct DOM transform manipulation). |
| **CLS (Cumulative Layout Shift)**  | `< 0.05` | Aspect-ratio containers, fixed dimension wrappers, and bold font width spacers in reading wave typography. |

---

## 2. Key Performance Optimizations Implemented

### 2.1 Next.js Image Optimization Enabled
In `next.config.mjs`, disabled `unoptimized: true` and enabled modern formats:
```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [
    { protocol: 'https', hostname: 'viralfabrics.com' }
  ]
}
```
Browsers receiving responsive WebP and AVIF variants experience **40&ndash;65% reduced payload weight** compared to raw PNG files.

### 2.2 Asset Quarantine & Public Folder Cleanup
- Identified 13 unreferenced video and concept PNG files totaling **~109.6 MB** (including loose files at root and in public).
- Safely quarantined into `/quarantine/` and excluded from build pipelines.
- Reduced initial static output footprint by over **68%**.

### 2.3 Zero Re-Render Scroll Momentum
In `components/WhoWeAreSection.tsx` and `app/page.tsx`, scrolling parallax calculations run directly inside `requestAnimationFrame` and update style properties (`transform`, `opacity`, `filter`) directly on DOM nodes, eliminating React re-render cycles during user scrolling.

### 2.4 Invisible Typography Bold Spacers
In `components/WhoWeAreSection.tsx`, the scroll reading wave transitions words between light, semi-bold, and bold. Invisible static spacers reserve the maximum bold character width, preventing word-wrapping shifts or layout reflows during reading progression.

---

## 3. Network & Caching Strategy

- **Static Pages:** Prerendered at build time (SSG).
- **Incremental Static Regeneration (ISR):** `/fabrics` and `/fabrics/[slug]` revalidate every 10 seconds (`revalidate = 10`), serving immediate cached responses from the edge while keeping inventory fresh.
- **HTTP Compression:** Enabled `compress: true` in `next.config.mjs` for automatic Gzip / Brotli compression.
- **Font Display:** Google Fonts configured with `display: 'swap'` to eliminate FOIT (Flash of Invisible Text).

