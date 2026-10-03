const { test, expect } = require('../../fixtures/testFixtures');
test('signup fields and login link are available', async ({ signupPage }) => {
  await signupPage.goto();
  for (const field of [signupPage.firstName, signupPage.lastName, signupPage.email, signupPage.password]) await expect(field).toBeVisible();
  await expect(signupPage.page.getByRole('link', { name: 'Log in' })).toBeVisible();
});
