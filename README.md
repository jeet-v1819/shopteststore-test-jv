# ShopTest Playwright E2E

JavaScript / Playwright Test framework. Public UI locators and routes were observed on the live rendered pages; authenticated UI could not be inspected from this environment. No admin/seller CRUD selectors or routes have been guessed. See `FEATURE-INVENTORY.md` for coverage and blockers.

## Run

```sh
npm install
npx playwright install
npx playwright test
npx playwright test --headed
npx playwright test --debug
npx playwright show-report
```

Copy `.env.example` to `.env` and fill credentials before running. Auth setup saves separate ignored states after checking nonempty cookies/localStorage and verifying persistence in a fresh browser context. Authenticated tests depend on setup; public tests can be run independently with `npx playwright test --project=desktop-public`.

HTML report: `playwright-report/index.html`. Failure screenshots/traces/video: `test-results/`.
