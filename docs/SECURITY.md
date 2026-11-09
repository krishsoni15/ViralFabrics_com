# VIRAL FABRICS — APPLICATION SECURITY POLICY & AUDIT

**Last Updated:** November 9, 2026  
**Auditor:** DevSecOps & Security Engineering  
**Standard:** OWASP Top 10 (2021/2025)  

---

## 1. Security Architecture Summary

Viral Fabrics employs a defense-in-depth posture addressing application layer vulnerabilities, database security, HTTP transport security, and automated denial-of-service/spam mitigation.

---

## 2. OWASP Top 10 Mitigation Matrix

| Vulnerability Category | Mitigation in Viral Fabrics Codebase |
| :--- | :--- |
| **A01: Broken Access Control** | Public endpoints serve read-only fabric catalog data. Sensitive CRM operations are decoupled from public Next.js endpoints. |
| **A02: Cryptographic Failures** | HSTS (`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`) enforced on all production requests. |
| **A03: Injection (NoSQL / SQL / XSS)** | All lead capture inputs (`name`, `email`, `phone`, `product`, `message`) in `/api/enquiry` are sanitized using tag-stripping utilities and length guards. Mongoose parameterized queries prevent NoSQL query injection. |
| **A04: Insecure Design** | Sliding window rate limiting (`lib/rateLimit.ts`) protects lead capture endpoints from automated spam and denial-of-service (max 5 submissions per 60 seconds per IP). |
| **A05: Security Misconfiguration** | Hardened HTTP response headers in `next.config.mjs`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection: 1; mode=block`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`. `poweredByHeader: false` prevents technology stack fingerprinting. |
| **A06: Vulnerable Components** | Dependencies scanned via `npm audit` with 0 known vulnerabilities across 242 packages. |
| **A07: Identification & Auth Failures** | Public storefront does not expose user login endpoints. MongoDB Atlas connections strictly require environment-variable credentials (`MONGODB_URI`). |
| **A08: Software & Data Integrity** | TypeScript strict compilation ensures type safety; static catalogue fallback prevents catastrophic downtime when database connectivity is degraded. |
| **A09: Security Logging & Monitoring** | Structured logging records lead capture timestamps, IP origins, and message lengths without exposing sensitive credentials or passwords. |
| **A10: Server-Side Request Forgery (SSRF)** | The application performs no arbitrary outbound URL fetches or server-side webhook relays based on untrusted user parameters. |

---

## 3. Secret Management & Credential Protocol

1. **Zero Secret Hardcoding:** Source code must never contain plaintext database URIs, API tokens, or SMTP passwords.
2. **Environment Separation:** Local development uses `.env.local` (git-ignored); production deployments configure environment variables securely within hosting providers (e.g. Vercel, Railway, or AWS).
3. **Graceful Fallback:** If `MONGODB_URI` is unconfigured, the application logs a safe warning and falls back to static specifications in `data/fabrics.ts`, preventing unhandled 500 crashes while protecting private credentials.

---

## 4. HTTP Security Headers (`next.config.mjs`)

```http
X-DNS-Prefetch-Control: on
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-XSS-Protection: 1; mode=block
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

