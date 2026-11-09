import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 440, height: 956 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  console.log('Navigating to http://localhost:3001 at 440x956...');
  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Click hamburger button to open drawer
  console.log('Clicking hamburger button...');
  const menuBtn = page.locator('button[aria-label="Toggle navigation menu"]');
  await menuBtn.click();
  await page.waitForTimeout(600);

  // Capture screenshot of the opened drawer
  console.log('Capturing mobile drawer screenshot...');
  await page.screenshot({ path: 'test-artifacts/mobile-drawer-light.png' });

  await browser.close();
  console.log('Mobile drawer verification completed successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

