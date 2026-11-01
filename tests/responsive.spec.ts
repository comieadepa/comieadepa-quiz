import { test, expect } from '@playwright/test';

const resolutions = [
  { name: '1920x1080', width: 1920, height: 1080 },
  { name: '1600x900',  width: 1600, height: 900 },
  { name: '1280x800',  width: 1280, height: 800 },
  { name: '1024x768',  width: 1024, height: 768 },
  { name: '800x1280',  width: 800,  height: 1280 },
  { name: '390x844',   width: 390,  height: 844 },
  { name: '360x800',   width: 360,  height: 800 },
];

for (const res of resolutions) {
  test(`Responsive test ${res.name}`, async ({ page }) => {
    await page.setViewportSize({ width: res.width, height: res.height });
    await page.goto('http://localhost:3003/pesquisa');

    // Wait for the card and question to render
    const question = page.locator('h2');
    await expect(question).toBeVisible();

    // Verify there is no horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2); // allowance of 1-2px for subpixel rendering

    // Verify options are rendered
    const buttons = page.locator('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(4);

    // Click on option "Excelente" (first option)
    const firstOption = page.getByRole('button', { name: 'Excelente' });
    await firstOption.click();

    // Verify "Próxima" button becomes enabled
    const nextBtn = page.getByRole('button', { name: 'Próxima' });
    await expect(nextBtn).toBeEnabled();

    // Take screenshot of this resolution
    await page.screenshot({ path: `scratch/screenshot_${res.name}.png`, fullPage: false });
  });
}
