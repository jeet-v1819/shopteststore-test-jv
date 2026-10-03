const { expect } = require('@playwright/test');
const { catalog } = require('../../test-data/catalog');

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Products', exact: true });
    // The cards expose both an image link and a title link with the same accessible name.
    // Filtering by visible link text selects the title link and avoids strict-mode ambiguity.
    this.headphones = this.productLink(catalog.headphones.name);
  }

  async goto() {
    await this.page.goto('/products');
    await expect(this.heading).toBeVisible();
  }

  async gotoCategory(categorySlug) {
    await this.page.goto(`/products?category=${encodeURIComponent(categorySlug)}`);
    await expect(this.heading).toBeVisible();
  }

  productLink(name) {
    return this.page.getByRole('link', { name, exact: true }).filter({ hasText: name });
  }

  async openHeadphones() {
    const expectedUrl = new URL(catalog.headphones.detailPath, this.page.url()).href;
    await Promise.all([
      this.page.waitForURL(expectedUrl),
      this.headphones.click()
    ]);
  }
}

module.exports = { ProductsPage };
