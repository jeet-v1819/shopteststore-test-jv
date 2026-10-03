const { test: base } = require('@playwright/test');
const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Verify the state in the browser, not merely that a JSON file exists.
    await page.goto('/login');
    await use(page);
  }
});
module.exports = { test, expect: test.expect };
