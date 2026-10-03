const { expect } = require('@playwright/test');
class SignupPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByLabel('First name');
    this.lastName = page.getByLabel('Last name');
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.submit = page.getByRole('button', { name: 'Sign up' });
  }
  async goto() { await this.page.goto('/register'); await expect(this.submit).toBeVisible(); }
}
module.exports = { SignupPage };
