# VIRAL FABRICS — ENVIRONMENT VARIABLES REFERENCE

**Last Updated:** November 9, 2026  
**Auditor:** DevSecOps Engineer  

---

## 1. Environment Variables Matrix

| Variable Name | Required | Default / Fallback | Scope | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `MONGODB_URI` | Optional | `undefined` (falls back to `data/fabrics.ts`) | Server-only | MongoDB Atlas connection string with authentication credentials. |
| `DATABASE_NAME` | Optional | `viralfabrics` | Server-only | Target MongoDB database name. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://viralfabrics.com` | Client & Server | Canonical site URL used for metadata, sitemaps, and absolute URLs. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Optional | Built-in site key | Client-only | Google reCAPTCHA v2 site key for spam prevention in enquiry form. |
| `RECAPTCHA_SECRET_KEY` | Optional | `undefined` | Server-only | Google reCAPTCHA v2 secret key for server-side token validation. |

---

## 2. Security Best Practices

1. **Never Commit Secrets:** `.env`, `.env.local`, `.env.production` are strictly listed in `.gitignore`.
2. **Client Scope Limitation:** Only variables prefixed with `NEXT_PUBLIC_` are exposed to client-side bundles. Sensitive keys (`MONGODB_URI`, `RECAPTCHA_SECRET_KEY`) must never carry the `NEXT_PUBLIC_` prefix.
3. **Graceful Fallback:** If `MONGODB_URI` is missing or the database connection times out, `lib/fabricsService.ts` will catch the error and serve the 10 static verified fabric qualities, guaranteeing zero downtime.

