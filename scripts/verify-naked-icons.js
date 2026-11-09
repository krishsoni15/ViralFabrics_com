const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
  const page = await browser.newPage();
  
  // 1. 1600px 2xl Desktop (Transparent Header)
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test-artifacts/verified-clean-header-2xl-transparent.png', clip: { x: 1000, y: 0, width: 600, height: 100 } });

  // 1b. 1600px 2xl Desktop (Scrolled White Header)
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'test-artifacts/verified-clean-header-2xl-scrolled.png', clip: { x: 1000, y: 0, width: 600, height: 80 } });

  // 2. 1280px Nest Hub Max (Transparent Header)
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test-artifacts/verified-clean-header-1280.png', clip: { x: 950, y: 0, width: 330, height: 100 } });

  // 3. 1032px iPad Pro 13 (Transparent Header)
  await page.setViewportSize({ width: 1032, height: 1376 });
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test-artifacts/verified-clean-header-ipad-left.png', clip: { x: 0, y: 0, width: 300, height: 100 } });
  await page.screenshot({ path: 'test-artifacts/verified-clean-header-ipad-right.png', clip: { x: 750, y: 0, width: 282, height: 100 } });

  // 4. 440px Mobile iPhone 16 Pro Max (Transparent Header)
  await page.setViewportSize({ width: 440, height: 956 });
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test-artifacts/verified-clean-header-mobile.png', clip: { x: 0, y: 0, width: 440, height: 100 } });

  await browser.close();
  console.log('All clean icon screenshots captured successfully');
})();

