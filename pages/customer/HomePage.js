const { expect } = require('@playwright/test');
class HomePage {
  constructor(page) {
    this.page = page;
    this.shopProducts = page.getByRole('link', { name: 'Shop products' });
    this.apiDocs = page.getByRole('link', { name: 'API docs' });
  }
  async goto() { await this.page.goto('/'); await expect(this.shopProducts).toBeVisible(); }
}
module.exports = { HomePage };
