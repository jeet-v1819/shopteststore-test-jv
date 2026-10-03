const { test, expect } = require('@playwright/test');
const { assertNonEmptyStorageState, hasNonEmptyBrowserStorage } = require('../../utils/storageState');

test('rejects an empty Playwright storage state', () => {
  const emptyState = { cookies: [], origins: [] };

  expect(hasNonEmptyBrowserStorage(emptyState)).toBe(false);
  expect(() => assertNonEmptyStorageState(emptyState, 'Admin')).toThrow(
    /Admin authentication failed: storage state is empty/
  );
});

test('rejects malformed storage state instead of treating it as authenticated', () => {
  for (const state of [undefined, {}, { cookies: null, origins: [] }, { cookies: [], origins: null }]) {
    expect(() => assertNonEmptyStorageState(state, 'Seller')).toThrow(/storage state is invalid/);
  }
});

test('accepts cookie-backed or localStorage-backed state', () => {
  const cookieState = { cookies: [{ name: 'session', value: 'present' }], origins: [] };
  const localStorageState = {
    cookies: [],
    origins: [{ origin: 'https://shopteststore.netlify.app', localStorage: [{ name: 'accessToken', value: 'present' }] }]
  };

  expect(assertNonEmptyStorageState(cookieState, 'Customer')).toBe(cookieState);
  expect(assertNonEmptyStorageState(localStorageState, 'Customer')).toBe(localStorageState);
});
