const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
  const page = await browser.newPage();
  
  // 1. Desktop 1440x900 scrolled to match user screenshot
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => window.scrollTo(0, 360));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'test-artifacts/verified-desktop-seam-merged.png', clip: { x: 0, y: 0, width: 1440, height: 750 } });

  // 2. iPad Pro 13 (1032x1376) scrolled
  await page.setViewportSize({ width: 1032, height: 1376 });
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'test-artifacts/verified-ipad-seam-merged.png', clip: { x: 0, y: 0, width: 1032, height: 800 } });

  // 3. Mobile iPhone 16 Pro Max (440x956) scrolled
  await page.setViewportSize({ width: 440, height: 956 });
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'test-artifacts/verified-mobile-seam-merged.png' });

  // 4. Initial loads (scrollY = 0)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'test-artifacts/verified-mobile-initial-load.png' });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'test-artifacts/verified-desktop-initial-load.png' });

  await browser.close();
  console.log('All verification screenshots captured successfully');
})();

