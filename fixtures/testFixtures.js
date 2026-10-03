const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pages/auth/LoginPage');
const { SignupPage } = require('../pages/auth/SignupPage');
const { HomePage } = require('../pages/customer/HomePage');
const { ProductsPage } = require('../pages/customer/ProductsPage');
const test = base.extend({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  signupPage: async ({ page }, use) => use(new SignupPage(page)),
  homePage: async ({ page }, use) => use(new HomePage(page)),
  productsPage: async ({ page }, use) => use(new ProductsPage(page))
});
module.exports = { test, expect: test.expect };
