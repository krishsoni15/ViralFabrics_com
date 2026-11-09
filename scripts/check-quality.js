const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 440, height: 956 });
  await page.goto('http://localhost:3001/about-us', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  const el = await page.$('#quality');
  if (el) {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-artifacts/verified-mobile-quality.png' });
    console.log('Quality screenshot taken');
  } else {
    console.log('No #quality found');
  }
  await browser.close();
})();

