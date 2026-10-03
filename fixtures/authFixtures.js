const { test: base } = require('@playwright/test');
const fs = require('node:fs/promises');
const path = require('node:path');
const { assertNonEmptyStorageState } = require('../utils/storageState');

const roleProjects = new Set(['admin', 'seller', 'customer']);

const test = base.extend({
  // Check the saved file before an authenticated test can use its browser context.
  // This also protects role projects run with --no-deps from accepting an empty state.
  validateRoleStorageState: [async ({}, use, testInfo) => {
    const role = testInfo.project.name;
    if (roleProjects.has(role)) {
      const statePath = path.resolve(testInfo.project.use.storageState);
      let state;
      try {
        state = JSON.parse(await fs.readFile(statePath, 'utf8'));
      } catch (error) {
        throw new Error(`${role} storage state could not be read from ${statePath}: ${error.message}`);
      }
      assertNonEmptyStorageState(state, role[0].toUpperCase() + role.slice(1));
    }
    await use();
  }, { auto: true }],
  authenticatedPage: async ({ page }, use) => {
    // The saved state is validated above. Navigating to the observed login route
    // exercises the existing fresh-page persistence check without guessing role URLs.
    await page.goto('/login');
    await use(page);
  }
});

module.exports = { test, expect: test.expect };
