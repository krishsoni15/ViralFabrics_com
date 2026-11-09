# VIRAL FABRICS — REST API SPECIFICATION

**Last Updated:** November 9, 2026  
**Auditor:** Full-Stack Architect  

---

## 1. Overview

Viral Fabrics exposes lightweight Next.js route handlers designed for fast cold starts, edge compatibility, and data resiliency.

---

## 2. Endpoints

### 2.1 Fetch Published Fabrics
- **Route:** `GET /api/fabrics`
- **Access:** Public (Read-Only)
- **Cache Strategy:** `force-dynamic` with static memory caching in service layer.

#### Response Example (`200 OK`):
```json
{
  "success": true,
  "data": [
    {
      "id": "bsy-fabrics",
      "name": "BSY Fabrics",
      "slug": "bsy-fabrics",
      "subtitle": "Specialized Bi-Shrinkage Yarn Weave",
      "description": "BSY (Bi-Shrinkage Yarn) fabrics are polyester fabrics made by combining two yams of different shrinkage rates...",
      "gsmRange": "80 – 180 GSM",
      "applications": ["Abayas & Burqas", "Ladies Kurtis", "Scarves & Hijabs", "Evening Wear"],
      "features": ["High Durability", "Wrinkle Free", "Rich Dye Absorption"],
      "weaveType": "Specialized Bi-Shrinkage",
      "finishing": ["Solid Dyed", "Rotary Print", "Peach Skin Brush"],
      "image": "/assets/uploads/2025/09/bsy-fabrics.png",
      "banner": "/assets/uploads/2025/09/bsy-fabrics-banner.png",
      "isPublished": true,
      "displayOrder": 1
    }
  ]
}
```

---

### 2.2 Submit Lead & Tech Pack Enquiry
- **Route:** `POST /api/enquiry`
- **Access:** Public
- **Rate Limit:** **5 requests per 60 seconds per IP address** (`429 Too Many Requests` returned when exceeded).

#### Request Headers:
```http
Content-Type: application/json
```

#### Request Payload:
```json
{
  "name": "Arun Kumar",
  "email": "arun.kumar@textilebuyer.com",
  "phone": "+91 98765 43210",
  "product": "BSY Fabrics",
  "message": "We need 15,000 meters of jet-black dyed BSY with peach finish for export production."
}
```

#### Validation Rules:
- `name`: Required string, 2&ndash;100 characters. Stripped of HTML tags.
- `email`: Required string, valid standard email format.
- `phone`: Required string, valid international format (`+`, digits, spaces, parentheses, dashes).
- `product`: Optional string, default: `"General Fabric Enquiry"`.
- `message`: Required string, 5&ndash;2500 characters. Stripped of HTML tags.

#### Response Example (`200 OK`):
```json
{
  "success": true,
  "message": "Thank you for your enquiry. Our team will contact you shortly.",
  "data": {
    "name": "Arun Kumar",
    "email": "arun.kumar@textilebuyer.com",
    "phone": "+91 98765 43210",
    "product": "BSY Fabrics"
  }
}
```

#### Error Response (`400 Bad Request`):
```json
{
  "success": false,
  "error": "Please provide a valid email address."
}
```

#### Rate Limit Response (`429 Too Many Requests`):
```json
{
  "success": false,
  "error": "Too many enquiry attempts. Please wait 45 seconds before trying again."
}
```
Headers returned: `Retry-After: 45`

