const { test, expect } = require('../../fixtures/authFixtures');
for (const role of ['admin', 'seller', 'customer']) {
  test(`@${role} saved login stays authenticated`, async ({ authenticatedPage }) => {
    await expect(authenticatedPage).not.toHaveURL(/\/login(?:\?|$)/);
  });
}
