# VIRAL FABRICS — PRODUCTION DEPLOYMENT GUIDE

**Last Updated:** November 9, 2026  
**Auditor:** DevSecOps Engineer  

---

## 1. Production Build Verification

Before deploying to production, run the quality gates:

```bash
# 1. Type check
npm run lint

# 2. Automated test suite
npm test

# 3. Compile optimized production build
npm run build
```

---

## 2. Deployment Targets

### Option A: Vercel (Recommended)
1. Link repository to Vercel.
2. In Project Settings &rarr; Environment Variables, configure:
   - `MONGODB_URI`: Your production MongoDB connection string.
   - `DATABASE_NAME`: `CRM_AdminPanel`
   - `NEXT_PUBLIC_SITE_URL`: `https://viralfabrics.com`
3. Set Node.js version to 20.x or 22.x LTS.
4. Deploy! Vercel will automatically configure edge caching, ISR for `/fabrics`, and global CDN routing.

---

### Option B: Docker Container / Self-Hosted VPS
Create a production `Dockerfile`:

```dockerfile
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t viralfabrics-web .
docker run -p 3001:3001 --env-file .env.production viralfabrics-web
```

---

## 3. Reverse Proxy & NGINX Configuration (VPS)

```nginx
server {
    listen 80;
    server_name viralfabrics.com www.viralfabrics.com;
    return 301 https://viralfabrics.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.viralfabrics.com;
    return 301 https://viralfabrics.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name viralfabrics.com;

    ssl_certificate /etc/letsencrypt/live/viralfabrics.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/viralfabrics.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 4. Post-Deployment Verification Checklist

1. Verify homepage responds with `200 OK` and security headers (`curl -I https://viralfabrics.com`).
2. Verify `/fabrics` renders all 10 product cards.
3. Test enquiry form submission (`/enquiry` and `/contact-us`).
4. Validate XML Sitemap (`https://viralfabrics.com/sitemap.xml`).
5. Validate Robots (`https://viralfabrics.com/robots.txt`).

