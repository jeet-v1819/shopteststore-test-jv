const { test, expect } = require('../../fixtures/testFixtures');
test('login form is accessible and has required fields', async ({ loginPage }) => {
  await loginPage.goto();
  await expect(loginPage.email).toBeVisible();
  await expect(loginPage.password).toBeVisible();
  await expect(loginPage.page.getByRole('link', { name: 'Sign up' })).toBeVisible();
});
test('empty login is blocked by form validation', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.submit.click();
  await expect(loginPage.page).toHaveURL(/\/login(?:\?|$)/);
  await expect(loginPage.email).toBeFocused();
});
test('invalid email format is blocked', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.email.fill('not-an-email');
  await loginPage.password.fill('Password123!');
  await loginPage.submit.click();
  await expect(loginPage.page).toHaveURL(/\/login(?:\?|$)/);
  await expect(loginPage.email).toBeFocused();
});
