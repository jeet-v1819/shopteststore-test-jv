const { test, expect } = require('../../fixtures/testFixtures');
test('catalog opens product details', async ({ productsPage }) => {
  await productsPage.goto();
  await productsPage.openHeadphones();
  await expect(productsPage.page.getByRole('heading', { name: 'Wireless Noise-Cancelling Headphones' })).toBeVisible();
  await expect(productsPage.page.getByText('50 in stock')).toBeVisible();
  await expect(productsPage.page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
});
