# VIRAL FABRICS — DEVELOPMENT SETUP & ONBOARDING

**Last Updated:** November 9, 2026  
**Auditor:** Full-Stack Architect  

---

## 1. System Requirements

- **Operating System:** Linux, macOS, or Windows (WSL2 recommended)
- **Node.js:** `v20.x` or `v22.x` LTS (Verified on `v26.x`)
- **NPM:** `v10.x` or later
- **Git:** `v2.30+`

---

## 2. Step-by-Step Installation

### Clone the Repository
```bash
git clone <repository-url>
cd ViralFabrics_com-main
```

### Install Dependencies
```bash
npm install
```

### Configure Local Environment Variables
Create a `.env.local` file from the provided example:
```bash
cp .env.example .env.local
```
Edit `.env.local`:
```env
# MongoDB Atlas Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
DATABASE_NAME=CRM_AdminPanel

# Canonical Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

> [!NOTE]
> If you do not have immediate MongoDB credentials, the application will automatically fall back to the static verified fabric dataset in `data/fabrics.ts`.

---

## 3. Running the Application

### Development Mode (Port 3001)
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser. Next.js will compile pages on-demand using Turbopack.

### Production Build & Test Locally
```bash
npm run build
npm start
```
Starts the optimized standalone server on port 3001.

---

## 4. Quality Gates & Testing Commands

```bash
# Execute automated unit and integration tests (22 tests across 8 suites)
npm test

# Run tests in interactive watch mode
npm run test:watch

# Run strict TypeScript compiler verification
npx tsc --noEmit

# Run Next.js linting across all files
npm run lint

# Compile full production build
npm run build
```

---

## 5. Recommended Editor Setup (VS Code)

- **Extensions:**
  - Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)
  - ESLint (`dbaeumer.vscode-eslint`)
  - Pretty TypeScript Errors (`yoavbls.pretty-ts-errors`)
- **Settings:**
  - Format on Save: Enabled
  - Tab Size: 2 spaces

