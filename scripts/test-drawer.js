const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 440, height: 956 });
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  const menuBtn = await page.$('button[aria-label="Toggle navigation menu"]');
  if (menuBtn) {
    await menuBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'test-artifacts/verified-mobile-drawer-light.png' });
    console.log('Mobile drawer screenshot taken');
  } else {
    console.log('No menu button found');
  }
  await browser.close();
})();

