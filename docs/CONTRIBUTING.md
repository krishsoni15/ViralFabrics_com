# VIRAL FABRICS — CONTRIBUTING GUIDELINES

**Last Updated:** November 9, 2026  

---

## 1. Branching Strategy

- `main` / `master`: Production-ready release branch.
- Feature branches: `feat/<feature-name>` or `fix/<bug-name>`.

---

## 2. Code Standards & Style

1. **TypeScript First:** Strict typing is enforced. Avoid unnecessary `any`.
2. **Component Boundaries:** Keep Server Components default; only mark `'use client'` when state, event handlers, or browser APIs are required.
3. **Asset Discipline:**
   - Place all new assets in logical folders under `public/images/` or `public/videos/`.
   - Never add unreferenced scratch media to the repository root.
4. **Security Discipline:**
   - Never commit API keys, connection strings, or credentials.
   - Sanitize all public form inputs and enforce rate limits.

---

## 3. Pull Request Checklist

Before submitting a Pull Request, run the local quality suite:

```bash
# 1. Type check
npm run lint

# 2. Automated test suite
npm test

# 3. Production build
npm run build
```

Ensure all 18 automated tests pass and the production build completes with 0 errors.

