function hasNonEmptyBrowserStorage(state) {
  if (!state || !Array.isArray(state.cookies) || !Array.isArray(state.origins)) {
    return false;
  }

  const hasCookies = state.cookies.length > 0;
  const hasLocalStorage = state.origins.some(origin =>
    origin && Array.isArray(origin.localStorage) && origin.localStorage.length > 0
  );

  return hasCookies || hasLocalStorage;
}

function assertNonEmptyStorageState(state, role = 'Authentication') {
  if (!state || !Array.isArray(state.cookies) || !Array.isArray(state.origins)) {
    throw new Error(`${role} storage state is invalid: expected cookies and origins arrays.`);
  }

  if (!hasNonEmptyBrowserStorage(state)) {
    throw new Error(
      `${role} authentication failed: storage state is empty (no cookies or localStorage entries).`
    );
  }

  return state;
}

module.exports = { assertNonEmptyStorageState, hasNonEmptyBrowserStorage };
