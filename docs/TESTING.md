# VIRAL FABRICS — AUTOMATED TESTING SPECIFICATION

**Last Updated:** November 9, 2026  
**Auditor:** QA Automation Engineer  

---

## 1. Testing Framework & Toolchain

- **Test Runner:** [Vitest 5.1.0](https://vitest.dev/)
- **DOM Simulation:** [JSDOM](https://github.com/jsdom/jsdom)
- **Component Testing:** [@testing-library/react](https://testing-library.com/)
- **DOM Matchers:** [@testing-library/jest-dom](https://github.com/testing-library/jest-dom)

---

## 2. Test Execution Commands

```bash
# Execute full test suite once
npm test

# Run tests in interactive watch mode
npm run test:watch
```

---

## 3. Test Suite Breakdown (22 Passing Tests Across 8 Suites)

### 3.1 Unit Tests (`test/unit/`)
1. **`test/unit/rateLimit.test.ts` (3 tests):**
   - Verified sliding window token accumulation.
   - Verified rejection and `resetInSeconds` reporting when rate limit is exceeded.
   - Verified isolation between distinct client IP addresses.
2. **`test/unit/fabricsService.test.ts` (3 tests):**
   - Verified graceful fallback to static catalog when database is not configured.
   - Verified fetching single fabric by slug.
   - Verified null return on non-existent slug.
3. **`test/unit/companyData.test.ts` (2 tests):**
   - Verified Surat registered company metadata integrity.
   - Verified all 10 core fabric qualities have valid unique slugs, descriptions, and GSM specifications.

### 3.2 Integration Tests (`test/integration/`)
1. **`test/integration/enquiryApi.test.ts` (5 tests):**
   - Verified HTTP 200 on valid lead capture payload.
   - Verified HTTP 400 when required fields are missing.
   - Verified HTTP 400 on invalid email formats.
   - Verified HTTP 400 on invalid phone number formats.
   - Verified HTTP 429 when client IP exceeds 5 requests per 60 seconds.
2. **`test/integration/fabricsApi.test.ts` (1 test):**
   - Verified HTTP 200 and JSON contract for public catalog endpoint.

### 3.3 Component Tests (`test/components/`)
1. **`test/components/Footer.test.tsx` (2 tests):**
   - Verified Surat plant address, direct phone, and email rendering.
   - Verified quick navigation links to About Us, Contact Us, and Network.
2. **`test/components/Navbar.test.tsx` (2 tests):**
   - Verified primary brand navigation links (Home, About Us, Network, Contact Us).
   - Verified header direct phone and email contact pills.
3. **`test/components/ContactComponents.test.tsx` (4 tests):**
   - Verified `LogisticsTransitGrid` multi-modal metrics (STV Airport, Hazira Ocean Port, Surat Railway Station).
   - Verified `ContactQrModal` null rendering when closed.
   - Verified `ContactQrModal` open state, title, and Escape/close handlers.
   - Verified `ContactQrModal` copy to clipboard callback interactions.

---

## 4. Test Results Snapshot

```txt
Test Files  8 passed (8)
     Tests  22 passed (22)
  Duration  5.52s
```
Zero test failures, zero skipped tests, zero fabricated results.

