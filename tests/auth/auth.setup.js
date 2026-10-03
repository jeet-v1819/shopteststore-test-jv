const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/auth/LoginPage');
const { assertNonEmptyStorageState } = require('../../utils/storageState');
const fs = require('node:fs/promises');

for (const role of ['admin', 'seller', 'customer']) {
  test(`authenticate ${role}`, async ({ browser, baseURL }) => {
    const email = process.env[`${role.toUpperCase()}_EMAIL`];
    const password = process.env[`${role.toUpperCase()}_PASSWORD`];
    if (!email || !password) throw new Error(`${role} credentials missing from environment`);
    const context = await browser.newContext({ baseURL });
    try {
      const page = await context.newPage();
      const login = new LoginPage(page);
      await login.goto();
      await login.login(email, password);
      await expect(page).not.toHaveURL(/\/login(?:\?|$)/);
      const state = await context.storageState();
      assertNonEmptyStorageState(state, role[0].toUpperCase() + role.slice(1));
      await fs.mkdir('auth', { recursive: true });
      const path = `auth/${role}.json`;
      // Only persist after verifying that the state actually authenticates a new context.
      const verification = await browser.newContext({ baseURL, storageState: state });
      try {
        const fresh = await verification.newPage();
        await fresh.goto('/login');
        await expect(fresh).not.toHaveURL(/\/login(?:\?|$)/);
      } finally { await verification.close(); }
      await context.storageState({ path });
    } finally { await context.close(); }
  });
}
