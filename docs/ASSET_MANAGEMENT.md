# VIRAL FABRICS — ASSET MANAGEMENT & MEDIA INVENTORY

**Last Updated:** November 9, 2026  
**Auditor:** DevSecOps & Media Engineering  

---

## 1. Overview & Preservation Policy

Viral Fabrics relies on high-resolution photography, bespoke luxury video reels, and brand vectors to represent high-speed water-jet weaves produced in Surat, Gujarat.

### Critical Media Preservation Directives:
1. **Zero Destructive Deletions:** No production media file may be deleted without verifying zero active references in code, CMS schemas, and dynamic route generators.
2. **Quarantine Procedure:** Unreferenced scratch videos or experimental AI generations are moved to the local `/quarantine/` folder rather than permanently purged.
3. **Format Support:** WebP and AVIF formats are preferred for raster assets; modern MP4 (H.264 / AAC) is standard for video background canvases.
4. **Optimization Pipeline:** Next.js Image Optimization is enabled in `next.config.mjs` to dynamically generate responsive WebP and AVIF variants with device-appropriate sizes.

---

## 2. Directory Architecture

```
public/
├── assets/                     # Historical brand marks, legacy uploads & partners
│   ├── brand/                  # Vector logos, crests, emblems & favicons
│   │   ├── logo.png            # Official Viral Fabrics master logo
│   │   ├── vf-emblem.png       # Minimalist mark used in attributions
│   │   └── favicon-*.png       # Multi-resolution favicons (32, 180, 192px)
│   ├── fabrics/                # Dedicated fabric weave cutouts
│   ├── partners/               # Global luxury brand & client logos
│   └── uploads/2025/           # Structured historical media uploads
│       ├── 08/                 # Brand emblems, badges, and background textures
│       └── 09/                 # Primary product catalog cards & banners (BSY, Satin, Crepe, etc.)
├── images/                     # Page-specific high-resolution background assets
│   ├── about/                  # Loom machinery, team photographs, silk waves
│   ├── enquiry/                # Fabric rolls banner & enquiry background
│   ├── network/                # Global routes distribution map & hero posters
│   ├── quality/                # 4-stage quality audit photography (Greige, Finished, Processing, Packing)
│   └── testimonials/           # Client review backdrop canvases
└── videos/                     # Autoplaying background hero and audit videos
    ├── about-hero-720p.mp4     # About Us luxury loom shed reel
    ├── contact-hero.mp4        # Contact page Surat facility reel
    ├── fabrics-hero.mp4        # Fabrics portfolio weaving process
    ├── network-hero.mp4        # Global logistics and flight corridor reel
    └── quality/                # 4 micro-inspection process videos (Greige, Finished, Processing, Packing)
```

---

## 3. Active Production Asset Inventory (61 Verified Assets)

### 3.1 Videos (10 Active Files)
| Asset Path | Resolution / Target | Purpose |
| :--- | :--- | :--- |
| `/craftsmanship-atelier.mp4` | 1080p Web Video | Homepage pinned hero background video |
| `/hero-video.mp4` | 1080p Web Video | Homepage hero fallback video source |
| `/videos/about-hero-720p.mp4` | 720p Optimized | About Us hero banner background reel |
| `/videos/contact-hero.mp4` | 720p Optimized | Contact Us facility hero banner reel |
| `/videos/fabrics-hero.mp4` | 720p Optimized | Fabrics catalog hero banner reel |
| `/videos/network-hero.mp4` | 720p Optimized | Global logistics network hero reel |
| `/videos/quality/greige-level.mp4` | 480p Loop | Stage 01 Greige level loom inspection |
| `/videos/quality/finished-level.mp4`| 480p Loop | Stage 02 Finished board fault inspection |
| `/videos/quality/processing-level.mp4` | 480p Loop | Stage 03 Lab dips & strike-offs loop |
| `/videos/quality/packing-level.mp4`| 480p Loop | Stage 04 Packaging & warehousing loop |

### 3.2 Core Fabric Product Photography (20 Active Files)
| Fabric Quality | Catalog Card Image | Hero Detail Banner |
| :--- | :--- | :--- |
| **BSY Fabrics** | `/assets/uploads/2025/09/bsy-fabrics.png` | `/assets/uploads/2025/09/bsy-fabrics-banner.png` |
| **Crepe Fabrics** | `/assets/uploads/2025/09/crepe-fabrics-1.png` | `/assets/uploads/2025/09/crepe-fabrics-banner.png` |
| **Georgette Fabrics** | `/assets/uploads/2025/09/georgette-fabrics-1.png` | `/assets/uploads/2025/09/georgette-fabrics-banner.png` |
| **Chiffon Fabrics** | `/assets/uploads/2025/09/chiffon-fabrics-1.png` | `/assets/uploads/2025/09/chiffon-fabrics-banner.png` |
| **Satin Fabrics** | `/assets/uploads/2025/09/satin-fabrics-1.png` | `/assets/uploads/2025/09/satin-fabrics-banner.png` |
| **Poly Knit Fabrics** | `/assets/uploads/2025/09/poly-knit-fabrics-1.png` | `/assets/uploads/2025/09/poly-knit-fabrics-banner.png` |
| **Poly Dobby / Jacquard** | `/assets/uploads/2025/09/poly-dobby.png` | `/assets/uploads/2025/09/poly-dobby-banner.png` |
| **Recycled PET Fabrics** | `/assets/uploads/2025/09/recycled-fabrics.png` | `/assets/uploads/2025/09/recycled-fabrics-banner.png` |
| **Net & Mesh Fabrics** | `/assets/uploads/2025/09/net-fabrics.png` | `/assets/uploads/2025/09/net-fabrics-banner.png` |
| **Viscose & Rayon Fabrics**| `/assets/uploads/2025/09/viscose-fabrics.png` | `/assets/uploads/2025/09/viscose-fabrics-banner.png` |

---

## 4. Quarantined Unreferenced Files

The following 13 assets were verified as completely unreferenced in all source files (`app`, `components`, `lib`, `data`, `models`) and moved into `/quarantine/`:

1. `Deep Blue Fabric Rolls on Pallet.png` (2.4 MB) — Unreferenced root raster
2. `Deep Blue Fabric Rolls on Pallet (1).png` (2.4 MB) — Duplicate copy in public/
3. `Elegant Ivory Textile with Blue Folds.png` (1.7 MB) — Unreferenced concept graphic
4. `Generated Video November 08, 2026 - 11_56AM.mp4` (5.2 MB) — AI generation test
5. `Generated Video November 08, 2026 - 11_57AM.mp4` (9.3 MB) — AI generation test
6. `Generated Video November 08, 2026 - 5_59PM.mp4` (7.9 MB) — AI generation test
7. `Generated Video November 09, 2026 - 12_35AM.mp4` (4.4 MB) — AI generation test
8. `Generated video 1 (3).mp4` (6.5 MB) — AI generation test
9. `Generated video 1 (4).mp4` (5.2 MB) — AI generation test
10. `Generated video 1 (7).mp4` (21.0 MB) — AI generation test
11. `Global Routes from Surat, Gujarat.png` (1.6 MB) — Unreferenced concept map
12. `Torn Paper Overlay with Transparent Center.png` (443 KB) — Unreferenced frame overlay
13. `Video Project 1.mp4` (41.0 MB) — Scratch video project file

**Total Storage Safely Preserved in Quarantine:** ~109.6 MB  
**Production Public Folder Size Reduction:** ~68%

