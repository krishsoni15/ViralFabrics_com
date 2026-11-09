import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: 'small-mobile', width: 320, height: 600 },
  { name: 'mobile-360', width: 360, height: 640 },
  { name: 'mobile-375', width: 375, height: 667 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'large-mobile-430', width: 430, height: 932 },
  { name: 'tablet-portrait-768', width: 768, height: 1024 },
  { name: 'tablet-landscape-1024', width: 1024, height: 768 },
  { name: 'laptop-1280', width: 1280, height: 800 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'large-desktop-1920', width: 1920, height: 1080 },
];

const PAGES = [
  { path: '/', name: 'homepage' },
  { path: '/about-us', name: 'about-us' },
  { path: '/fabrics', name: 'fabrics-catalog' },
  { path: '/fabrics/bsy-fabrics', name: 'fabric-detail-bsy' },
  { path: '/network', name: 'network' },
  { path: '/contact-us', name: 'contact-us' },
  { path: '/enquiry', name: 'enquiry' },
];

const SCREENSHOT_DIR = path.resolve(process.cwd(), 'docs/screenshots');

async function runAudit() {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];

  for (const pageInfo of PAGES) {
    console.log(`\n=== Auditing ${pageInfo.name} (${pageInfo.path}) ===`);
    const pageResults = {
      page: pageInfo.name,
      path: pageInfo.path,
      viewports: [],
    };

    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page = await context.newPage();

      const consoleErrors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      try {
        await page.goto(`http://localhost:3001${pageInfo.path}`, {
          waitUntil: 'domcontentloaded',
          timeout: 20000,
        });
        await page.waitForTimeout(800);

        // Evaluate overflow and find overflowing elements
        const overflowData = await page.evaluate(() => {
          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          const hasOverflow = docWidth > winWidth;
          const overflowingElements = [];

          if (hasOverflow) {
            const allElements = document.querySelectorAll('*');
            for (const el of allElements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > winWidth + 1) {
                overflowingElements.push({
                  tag: el.tagName.toLowerCase(),
                  className: el.className ? String(el.className).slice(0, 100) : '',
                  id: el.id || '',
                  right: Math.round(rect.right),
                  width: Math.round(rect.width),
                });
                if (overflowingElements.length >= 5) break;
              }
            }
          }

          return {
            docWidth,
            winWidth,
            hasOverflow,
            overflowDiff: docWidth - winWidth,
            overflowingElements,
          };
        });

        // Screenshot representative viewports
        const isRepresentative = ['mobile-375', 'tablet-portrait-768', 'tablet-landscape-1024', 'desktop-1440'].includes(vp.name);
        let screenshotPath = null;
        if (isRepresentative) {
          screenshotPath = path.join(SCREENSHOT_DIR, `${pageInfo.name}-${vp.name}.png`);
          await page.screenshot({ path: screenshotPath, fullPage: false });
        }

        const vpResult = {
          viewport: vp.name,
          width: vp.width,
          hasOverflow: overflowData.hasOverflow,
          docWidth: overflowData.docWidth,
          overflowDiff: overflowData.overflowDiff,
          overflowingElements: overflowData.overflowingElements,
          screenshot: screenshotPath ? path.relative(process.cwd(), screenshotPath) : null,
          consoleErrorsCount: consoleErrors.length,
        };

        pageResults.viewports.push(vpResult);
        const statusIcon = overflowData.hasOverflow ? '❌ OVERFLOW' : '✅ OK';
        console.log(`  [${vp.name} (${vp.width}px)] ${statusIcon} (doc: ${overflowData.docWidth}px, diff: ${overflowData.overflowDiff}px)`);
        if (overflowData.hasOverflow && overflowData.overflowingElements.length > 0) {
          console.log(`    Top overflowing element: <${overflowData.overflowingElements[0].tag} class="${overflowData.overflowingElements[0].className}"> right: ${overflowData.overflowingElements[0].right}px`);
        }
      } catch (err) {
        console.error(`  Error testing ${pageInfo.name} at ${vp.name}:`, err.message);
        pageResults.viewports.push({
          viewport: vp.name,
          width: vp.width,
          error: err.message,
        });
      } finally {
        await context.close();
      }
    }
    results.push(pageResults);
  }

  await browser.close();

  fs.writeFileSync('scripts/responsive-results.json', JSON.stringify(results, null, 2));
  console.log('\nAudit complete! Results saved to scripts/responsive-results.json');
}

runAudit().catch(console.error);

