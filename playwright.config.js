// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    storageState: 'auth.json',
    baseURL: 'https://the-internet.herokuapp.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  globalSetup: './global-setup.mjs',
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
        channel: 'chrome',
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: 'auth.json',
    //     channel: 'firefox',
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: 'auth.json',
    //     // No real Safari via Playwright, but we can keep WebKit as is
    //   },
    // },
  ],
});
