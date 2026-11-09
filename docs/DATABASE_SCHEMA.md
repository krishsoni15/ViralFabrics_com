# VIRAL FABRICS — DATABASE SCHEMA & MONGODB SPECIFICATION

**Last Updated:** November 9, 2026  
**Auditor:** Full-Stack Architect  

---

## 1. Overview

Viral Fabrics uses **MongoDB Atlas** as its document datastore, accessed via **Mongoose 9.11.4**. The database layer provides live CMS fabric cataloging while the application guarantees full operational continuity via local static backups in `data/fabrics.ts`.

---

## 2. Collection: `websitefabrics`

Defined in [`models/WebsiteFabric.ts`](file:///home/krish/Desktop/Projects/ViralFabrics_com-main/models/WebsiteFabric.ts).

### 2.1 Schema Definition
```typescript
interface IWebsiteFabric extends Document {
  name: string;           // Display name (e.g. "BSY Fabrics")
  slug: string;           // Unique URL slug (e.g. "bsy-fabrics")
  subtitle: string;       // Technical subtitle (e.g. "Specialized Bi-Shrinkage")
  description: string;    // Technical specification description
  image: string;          // Catalog square/card image path
  banner?: string;        // Hero detail banner image path
  isPublished: boolean;   // Visibility flag (default: true)
  displayOrder: number;   // Sorting order in catalog (ascending)
  createdAt: Date;        // Timestamp (automated)
  updatedAt: Date;        // Timestamp (automated)
}
```

### 2.2 Field Constraints & Indexing
- `slug`: String, Required, Unique, Lowercase, Trimmed. **Index:** `{ slug: 1 }, { unique: true }`.
- `name`: String, Required, Trimmed.
- `subtitle`: String, Required, Trimmed.
- `description`: String, Required, Trimmed.
- `image`: String, Required, Trimmed.
- `banner`: String, Default: `'/assets/uploads/2025/09/bsy-fabrics-banner.png'`.
- `isPublished`: Boolean, Default: `true`. **Compound Index:** `{ isPublished: 1, displayOrder: 1, createdAt: -1 }`.
- `displayOrder`: Number, Default: `0`.
- `timestamps`: Enabled (`createdAt`, `updatedAt`).

---

## 3. Database Connection Pooling (`lib/mongodb.ts`)

- **Max Pool Size:** `10` simultaneous connections.
- **Server Selection Timeout:** `5000ms`.
- **Global Caching:** Uses `global.mongooseCache` to reuse established connections across hot-reloads and serverless function invocations without exhausting connection limits.
- **Error Isolation:** If connection fails, the error is caught safely by `lib/fabricsService.ts` and falls back to `data/fabrics.ts`.

