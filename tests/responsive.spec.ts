import { test, expect } from '@playwright/test';

const resolutions = [
  { name: 'celular_vertical_390x844',   width: 390,  height: 844 },
  { name: 'celular_horizontal_844x390', width: 844,  height: 390 },
  { name: 'celular_horizontal_800x360', width: 800,  height: 360 },
  { name: 'tablet_vertical_800x1280',   width: 800,  height: 1280 },
  { name: 'tablet_horizontal_1280x800', width: 1280, height: 800 },
  { name: 'desktop_1600x900',           width: 1600, height: 900 },
];

for (const res of resolutions) {
  test(`Prompt 12 Landscape/Stability - ${res.name}`, async ({ page }) => {
    await page.setViewportSize({ width: res.width, height: res.height });
    await page.goto('http://localhost:3003/pesquisa');

    // Wait for the question to render
    const question = page.locator('h2');
    await expect(question).toBeVisible();

    // Verify zero horizontal scroll
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    // Verify options are clickable and functional
    const firstOption = page.getByRole('button', { name: 'Excelente' });
    await expect(firstOption).toBeVisible();
    await firstOption.click();

    // Verify "Próxima" button becomes enabled and visible
    const nextBtn = page.getByRole('button', { name: 'Próxima' });
    await expect(nextBtn).toBeEnabled();
    await expect(nextBtn).toBeVisible();

    // Take screenshot of this resolution
    await page.screenshot({ path: `scratch/prompt12_${res.name}.png`, fullPage: false });
  });
}

test('Prompt 12 - Mudança de orientação durante o questionário (390x844 -> 844x390)', async ({ page }) => {
  // Inicia em celular vertical
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3003/pesquisa');

  // Seleciona uma alternativa
  const optionBoa = page.getByRole('button', { name: 'Boa' });
  await expect(optionBoa).toBeVisible();
  await optionBoa.click();

  // Avança para a pergunta 2
  const nextBtn = page.getByRole('button', { name: 'Próxima' });
  await nextBtn.click();
  await page.waitForTimeout(300);

  // Seleciona na pergunta 2
  const optionBom = page.getByRole('button', { name: 'Bom' });
  await expect(optionBom).toBeVisible();
  await optionBom.click();

  // Gira a tela para Horizontal (Landscape: 844x390)
  await page.setViewportSize({ width: 844, height: 390 });
  await page.waitForTimeout(300);

  // Verifica se a alternativa selecionada permanece marcada
  await expect(optionBom).toBeVisible();
  await expect(nextBtn).toBeEnabled();

  // Verifica que não há rolagem horizontal após girar
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

  // Captura tela pós rotação
  await page.screenshot({ path: 'scratch/prompt12_rotacao_844x390.png', fullPage: false });
});
