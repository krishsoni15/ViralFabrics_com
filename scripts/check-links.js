const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto('http://localhost:3001/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(400);

  const phoneLink = await page.locator('a[href*="tel:"]').first();
  const mailLink = await page.locator('a[href*="mailto:"]').first();

  const pStyle = await phoneLink.evaluate(el => ({
    border: window.getComputedStyle(el).border,
    borderRadius: window.getComputedStyle(el).borderRadius,
    background: window.getComputedStyle(el).backgroundColor,
    className: el.className
  }));

  const mStyle = await mailLink.evaluate(el => ({
    border: window.getComputedStyle(el).border,
    borderRadius: window.getComputedStyle(el).borderRadius,
    background: window.getComputedStyle(el).backgroundColor,
    className: el.className
  }));

  console.log('Phone link styles:', pStyle);
  console.log('Mail link styles:', mStyle);
  await browser.close();
})();

