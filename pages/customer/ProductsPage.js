const { expect } = require('@playwright/test');
class ProductsPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Products', exact: true });
    this.headphones = page.getByRole('link', { name: 'Wireless Noise-Cancelling Headphones', exact: true });
  }
  async goto() { await this.page.goto('/products'); await expect(this.heading).toBeVisible(); }
  async openHeadphones() { await this.headphones.click(); }
}
module.exports = { ProductsPage };
