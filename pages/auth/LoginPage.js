const { expect } = require('@playwright/test');
class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.submit = page.getByRole('button', { name: 'Log in' });
  }
  async goto() { await this.page.goto('/login'); await expect(this.submit).toBeVisible(); }
  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }
}
module.exports = { LoginPage };
