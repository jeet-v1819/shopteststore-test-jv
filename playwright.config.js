const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  workers: process.env.CI ? 2 : 4,
  retries: process.env.CI ? 2 : 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL || 'https://shopteststore.netlify.app',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.js/, use: { ...devices['Desktop Chrome'] } },
    { name: 'desktop-public', testIgnore: /auth\.setup\.js|authenticated\.spec\.js/, use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-public', testMatch: /customer-home\.spec\.js|login\.spec\.js/, use: { ...devices['iPhone 13'] } },
    ...['admin', 'seller', 'customer'].map(role => ({
      name: role, testMatch: /authenticated\.spec\.js/,
      grep: new RegExp(`@${role}\\b`), dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'], storageState: `auth/${role}.json` }
    }))
  ]
});
