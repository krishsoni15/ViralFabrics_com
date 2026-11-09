const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
  const context = await browser.newContext();
  
  // 1. Nest Hub Max (1280 x 800) on /fabrics
  let page = await context.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('http://localhost:3001/fabrics', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-artifacts/current-nesthubmax-fabrics.png', clip: { x: 0, y: 0, width: 1280, height: 120 } });
  
  // 2. iPad Pro 13 (1032 x 1376) on /
  await page.setViewportSize({ width: 1032, height: 1376 });
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-artifacts/current-ipadpro-home.png', clip: { x: 0, y: 0, width: 1032, height: 120 } });

  // 2b. iPad Pro 13 (1032 x 1376) on /fabrics
  await page.goto('http://localhost:3001/fabrics', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test-artifacts/current-ipadpro-fabrics.png', clip: { x: 0, y: 0, width: 1032, height: 120 } });
  
  // 3. iPhone 16 Pro Max (440 x 956) on /about-us
  await page.setViewportSize({ width: 440, height: 956 });
  await page.goto('http://localhost:3001/about-us', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    const el = document.getElementById('quality-practices');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'test-artifacts/current-mobile-about-quality.png' });

  // 4. iPhone 16 Pro Max (440 x 956) on /
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(1000);
  await page.evaluate(() => {
    const el = document.getElementById('who-we-are');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'test-artifacts/current-mobile-home-whoweare.png' });

  // 5. iPhone 16 Pro Max on /contact-us
  await page.goto('http://localhost:3001/contact-us', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'test-artifacts/current-mobile-contact-scroll.png' });

  await browser.close();
  console.log('All screenshots captured successfully');
})();
