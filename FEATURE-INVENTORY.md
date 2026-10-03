# Discovery / coverage

Observed via rendered page fetches on 2026-10-03:

| Area | Observed | Automated |
|---|---|---|
| Home | Shop products, API docs, categories, top rated product cards | navigation |
| Login | email, password, Log in, quick fill accounts, signup link | fields, validation, role auth setup |
| Register | first/last name, email, password, phone, account type, sign up | field/link smoke |
| Products | catalog, stock, links, pagination; product details with reviews, wishlist and cart | catalog to details smoke |
| API docs | auth, users, categories, products/variants, reviews, cart, addresses, orders/returns, wishlist, coupons | inventoried only |
| Admin/Seller/Customer protected pages | inaccessible to page-fetch without authentication | auth persistence only |

## Execution environment blocker

The sandbox's direct HTTPS connection to `shopteststore.netlify.app:443` terminates during TLS handshake (`curl: (35) SSL_ERROR_SYSCALL`). Page-fetch can retrieve public rendered content but cannot retain an interactive browser session. Consequently authenticated navigation/forms, discounts, promotional offers, checkout, role access, and responsive UI were **not inspected**. Do not treat the absence of those tests as proof that features are absent. Running Playwright here will report transport failures, not app defects. Execute in a browser/network environment able to reach the host, then inspect actual authenticated UI and extend POM/tests based on observation.

## Coverage report (implemented, not claiming successful execution)

| Module | Feature | Test Count | Passed | Failed | Skipped |
|---|---|---:|---:|---:|---:|
| Auth | Login/validation | 3 | 0 | 3* | 0 |
| Auth | Signup smoke | 1 | 0 | 1* | 0 |
| Auth | Role setup and persistence | 6 | 0 | 0 | 6 |
| Customer | Home | 1 | 0 | 0 | 1 |
| Customer | Products | 1 | 0 | 0 | 1 |
| Admin/Seller/Customer | Other protected features | 0 | 0 | 0 | 0 |

Counts exclude project duplication on desktop/mobile. No application bugs established; transport blocker prevents distinguishing application failures. No guessed role routes or fabricated CRUD tests were added.

## Local run result

`npx playwright test --list`: 16 project-expanded tests discovered. `npx playwright test --project=desktop-public --max-failures=1`: 4 failed before browser launch, 2 did not run (browser executable missing); these are infrastructure failures, **not test assertion or application failures**. `npx playwright install chromium webkit` was attempted and failed with TLS `ECONNRESET` to `cdn.playwright.dev`. No HTML report with meaningful application results can be generated here. The HTML reporter output is under `playwright-report/` and is excluded from Git.

\* Infrastructure browser-launch failures on the desktop run, before any application assertion. Remaining listed rows were not executed; “Skipped” denotes not run, not Playwright `test.skip()`.
