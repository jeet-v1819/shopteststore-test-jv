const { test, expect } = require('../../fixtures/testFixtures');
test('storefront links to catalog and API documentation', async ({ homePage }) => {
  await homePage.goto();
  await expect(homePage.apiDocs).toBeVisible();
  await homePage.shopProducts.click();
  await expect(homePage.page).toHaveURL(/\/products(?:\?|$)/);
});
