# VIRAL FABRICS — TECHNICAL SEO STRATEGY & SPECIFICATION

**Last Updated:** November 9, 2026  
**Auditor:** Technical SEO Specialist  
**Domain:** `https://viralfabrics.com`  

---

## 1. Overview & Search Architecture

Viral Fabrics is optimized to rank for high-intent B2B textile sourcing queries such as "Export synthetic fabric manufacturer Surat", "BSY fabric supplier India", "Water-jet loom shed Surat", and "Make-to-order polyester fabrics".

The technical SEO architecture implements Next.js App Router metadata conventions, dynamic XML sitemaps, robots.txt directives, OpenGraph social sharing tags, canonical URLs, and Schema.org JSON-LD structured data.

---

## 2. Route-by-Route SEO Metadata Matrix

| Route | Title | Canonical URL | OpenGraph Image |
| :--- | :--- | :--- | :--- |
| `/` | `Viral Fabrics \| Haute Synthetic Textile Manufacturer Surat` | `https://viralfabrics.com` | `/assets/brand/favicon-180x180.png` |
| `/about-us` | `About Us \| Viral Fabrics Surat - Textile Heritage & Infrastructure` | `https://viralfabrics.com/about-us` | `/images/about/viral-fabrics-team.jpg` |
| `/fabrics` | `Fabrics Portfolio \| Viral Fabrics Surat - Export Synthetic Textiles` | `https://viralfabrics.com/fabrics` | `/assets/uploads/2025/09/bsy-fabrics-banner.png` |
| `/fabrics/[slug]` | `{Fabric Name} \| Viral Fabrics Surat` | `https://viralfabrics.com/fabrics/{slug}` | `{fabric.image}` |
| `/network` | `Global Export Network \| Viral Fabrics Surat - Distribution Corridors` | `https://viralfabrics.com/network` | `/images/network/network-routes-map.png` |
| `/contact-us`| `Contact Surat Facility \| Viral Fabrics Surat - Manufacturing Plant & Sales` | `https://viralfabrics.com/contact-us` | `/assets/brand/logo.png` |
| `/enquiry` | `Enquiry & Quotations \| Viral Fabrics Surat - Request Fabric Swatches` | `https://viralfabrics.com/enquiry` | `/assets/brand/logo.png` |

---

## 3. Structured Data (Schema.org JSON-LD)

### 3.1 Organization & WebSite (`app/layout.tsx`)
Injected globally into `<head>`:
- **`@type: Organization`**: Legal name (`Viral Fabrics Pvt. Ltd.`), founding year (2012), Surat registered address, sales contact point (+91 94279 88999, `viralfabrics@yahoo.com`), languages (English, Hindi, Gujarati), and export coverage (`IN`, `AE`, `US`, `GB`, `EU`).
- **`@type: WebSite`**: Master URL, publisher entity reference.

### 3.2 Product & BreadcrumbList (`app/fabrics/[slug]/page.tsx`)
Injected dynamically for each fabric quality:
- **`@type: Product`**: Fabric quality name, technical description, material construction, high-resolution photography, brand entity, manufacturer entity, and availability (`https://schema.org/InStock`).
- **`@type: BreadcrumbList`**: Hierarchical 3-level breadcrumbs (`Home` &rarr; `Fabrics Portfolio` &rarr; `{Fabric Name}`).

---

## 4. Crawlability & Indexing Directives

### 4.1 Robots Directive (`app/robots.ts`)
```txt
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://viralfabrics.com/sitemap.xml
```

### 4.2 Dynamic Sitemap (`app/sitemap.ts`)
- Automatically generates static routes (`/`, `/about-us`, `/fabrics`, `/network`, `/contact-us`, `/enquiry`) with appropriate update frequencies and priorities.
- Automatically maps all 10 core fabric qualities (`/fabrics/bsy-fabrics`, `/fabrics/satin-fabrics`, etc.) with `priority: 0.85`.

---

## 5. Google Search Console & External Setup Checklist

1. **Domain Ownership Verification:** Submit DNS TXT record or HTML meta tag in Google Search Console.
2. **Sitemap Submission:** Submit `https://viralfabrics.com/sitemap.xml`.
3. **Core Web Vitals Monitoring:** Track LCP (< 2.5s), INP (< 200ms), and CLS (< 0.1).
4. **Bing Webmaster Tools:** Import Google Search Console verification for global visibility across European and Asian markets.

