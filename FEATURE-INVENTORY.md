# Feature inventory and validation status

**Overall status: partial starter only.** Admin, Seller, and authenticated Customer UI coverage is not complete. Features are not considered covered merely because a test project or API endpoint exists.

## Evidence and environment

Inspected on 2026-10-03:

- Public rendered page content was available through the page-fetch reader. It is useful for discovering visible copy and public routes, but does not expose an interactive browser session or authenticated UI.
- Direct workspace HTTPS to `shopteststore.netlify.app:443` fails with `curl: (35) OpenSSL SSL_connect: SSL_ERROR_SYSCALL`.
- The previous browser download attempt (`npx playwright install chromium webkit`) failed with TLS `ECONNRESET`. This continuation did not repeat it.
- `npx playwright --version` reports **1.63.0**. `npx playwright install --list` cannot find the Playwright `.links` inventory; no system Chromium/Chrome/Edge/Firefox executable was found.
- The earlier starter run recorded four `desktop-public` cases failing before browser launch and two not run due to the missing executable. Those were infrastructure outcomes, not observed application assertion failures. Browser tests were not repeated during this continuation because the browser remains unavailable.
- `.env` and `auth/*.json` are absent. The seeded credentials are present in `.env.example`, but were not used to attempt a login because no browser can launch.

## Verified

“Verified” below means inspected in rendered public content or checked by the named local unit tests. It does not mean browser-driven end-to-end behavior passed.

### Public content observed

- **Home:** Shop products and API docs links; category links; top-rated product cards.
- **Login:** Email and Password fields, Log in button, seeded-account information, and Sign up link.
- **Register:** First name, Last name, Email, Password, optional Phone, account type options, Sign up button, and Log in link.
- **Catalog:** 13 products in the observed snapshot, product links, stock/price content, pagination text, and category filtering. The observed Electronics category URL returned four electronics products.
- **Product details:** Wireless Noise-Cancelling Headphones image/title, `$199.99`, SKU `ELEC-WH-001`, the observed product description, `50 in stock`, Add to cart, Wishlist, and three rendered reviews.
- **Published OpenAPI document:** Auth, users, categories, products/variants, reviews, cart, addresses, orders/returns, wishlist, and coupons endpoints/schemas. This is API-contract inspection only; no API or UI operations were executed.

### Local checks executed

- `npx playwright test tests/auth/storage-state.spec.js --project=desktop-public --workers=1 --reporter=list`: **3 passed**. These test the local validator for empty, malformed, cookie-backed, and localStorage-backed browser-state objects. They do not prove a role can log in.
- JavaScript syntax checks for changed framework files: passed.
- `npx playwright test --list`: **20 project-expanded tests discovered**; discovery is not execution.

## Implemented but not executed

- Existing authentication, home, and catalog POMs; a product-details POM was added and the catalog-to-details assertions now cover observed image, title, price, SKU, description, stock, cart/wishlist labels, and review heading. These assertions remain browser-blocked.
- `test-data/catalog.js` centralizes only the public seeded product values observed in the rendered page snapshots.
- Existing public login, signup, storefront, and product-detail tests. A category deep-link smoke test was added using the publicly observed Electronics category URL.
- Existing Playwright fixtures for login, signup, home, and products, extended with a product-details fixture.
- Existing role setup reads `ADMIN_*`, `SELLER_*`, and `CUSTOMER_*` from `.env`/the process environment and writes separate ignored files at `auth/admin.json`, `auth/seller.json`, and `auth/customer.json` after a fresh-context persistence check.
- A shared storage-state utility now rejects missing/malformed state and state with both empty cookies and empty origins/localStorage; its three isolated checks passed as recorded above.
- Existing `@admin`, `@seller`, and `@customer` saved-login smoke-test structure. The auth fixture validates each role's JSON state before an authenticated page is used, including when a role project is run with `--no-deps`.

The browser tests and authentication setup were **not executed** in this environment. No role auth JSON was generated.

## Not implemented

No UI tests or POMs have been added for these areas because actual UI controls, routes, and selectors were not inspectable:

- **Admin:** Dashboard/navigation, Users, Products CRUD, Categories CRUD, Orders, Coupons UI, Promotional Offers, Settings, search/filter/sort/pagination, validation, empty/error/success states, and the coupon/offer input-focus regression.
- **Seller:** Dashboard, Seller Products CRUD, Seller Orders/status changes, Profile, and role-specific navigation/validation.
- **Customer authenticated flows:** Cart, wishlist, applying coupons/offers, checkout and totals, placing/verifying an order, Orders, Profile, reviews, logout, and authorization checks.
- **Business flows:** customer purchase → seller status update → customer/admin order verification, and the full multi-role purchase flow using isolated browser contexts.
- **Authentication execution:** real login and persistence for the seeded roles.

The OpenAPI document describes API operations such as Admin user/category/product/coupon administration, role-scoped product/order/return operations, and customer cart/checkout/wishlist/review operations. Those API contracts do not substitute for UI inspection or tests. Promotional Offers and Settings were not listed in the OpenAPI document; that is not evidence that their UI does not exist.

## Not accessible

- Admin, Seller, and authenticated Customer pages, navigation, forms, protected route behavior, and UI selectors.
- Role authorization behavior in a live session (redirect/access-denied/other).
- Browser-driven authentication and storage-state persistence.
- Cart, wishlist, checkout, order, profile, coupon, review, and multi-role UI behavior.

**AUTHENTICATION NOT EXECUTED DUE TO ENVIRONMENT ACCESS/BROWSER LIMITATION.** Public page snapshots were accessible; direct HTTPS and browser execution were not. No protected route or selector has been guessed.

## Test counts and execution status

Counts below are project-expanded (`desktop-public`, `mobile-public`, setup, and role projects). “Blocked” means the test exists but could not be run; it is not a Playwright assertion failure. Rows with zero cases were not implemented, not silently passed.

| Module | Feature | Test Count | Passed | Failed | Blocked |
|---|---|---:|---:|---:|---:|
| Auth | Login | 6 | 0 | 0 | 6 |
| Auth | Signup | 1 | 0 | 0 | 1 |
| Auth | Logout | 0 | 0 | 0 | 0 |
| Auth | Role login setup | 3 | 0 | 0 | 3 |
| Auth | Saved-state persistence smoke | 3 | 0 | 0 | 3 |
| Auth | Storage-state validation (isolated) | 3 | 3 | 0 | 0 |
| Admin | Dashboard/navigation | 0 | 0 | 0 | 0 |
| Admin | Products | 0 | 0 | 0 | 0 |
| Admin | Orders | 0 | 0 | 0 | 0 |
| Admin | Users | 0 | 0 | 0 | 0 |
| Admin | Categories | 0 | 0 | 0 | 0 |
| Admin | Coupons | 0 | 0 | 0 | 0 |
| Admin | Promotional Offers | 0 | 0 | 0 | 0 |
| Admin | Settings | 0 | 0 | 0 | 0 |
| Seller | Dashboard | 0 | 0 | 0 | 0 |
| Seller | Products | 0 | 0 | 0 | 0 |
| Seller | Orders | 0 | 0 | 0 | 0 |
| Seller | Profile | 0 | 0 | 0 | 0 |
| Customer | Home | 2 | 0 | 0 | 2 |
| Customer | Products/details/category | 2 | 0 | 0 | 2 |
| Customer | Search | 0 | 0 | 0 | 0 |
| Customer | Cart | 0 | 0 | 0 | 0 |
| Customer | Wishlist | 0 | 0 | 0 | 0 |
| Customer | Coupon/promotional offer | 0 | 0 | 0 | 0 |
| Customer | Checkout | 0 | 0 | 0 | 0 |
| Customer | Orders | 0 | 0 | 0 | 0 |
| Customer | Profile | 0 | 0 | 0 | 0 |
| Customer | Reviews | 0 | 0 | 0 | 0 |
| **Total discovered** |  | **20** | **3** | **0** | **17** |

No full browser suite was run. The **0 failed** column means no application assertion failures were observed during this continuation; it does not mean the blocked tests passed.
