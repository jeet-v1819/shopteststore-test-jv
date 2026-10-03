const { test, expect } = require('../../fixtures/testFixtures');
const { catalog } = require('../../test-data/catalog');

test('catalog opens product details with the observed product data', async ({ productsPage, productDetailsPage }) => {
  await productsPage.goto();
  await productsPage.openHeadphones();
  await productDetailsPage.expectProduct(catalog.headphones);
});

test('electronics category deep link shows category products only', async ({ productsPage }) => {
  await productsPage.gotoCategory(catalog.electronicsSlug);
  await expect(productsPage.productLink(catalog.headphones.name)).toBeVisible();
  await expect(productsPage.productLink(catalog.cleanCode.name)).toHaveCount(0);
});
