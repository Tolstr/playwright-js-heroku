import 'dotenv/config';

// playwright.config.js
import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  // keep only generic settings here; put baseURL/storageState per project
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  globalSetup: './global-setup.mjs',

  projects: [
    // UI project (Chrome)
    {
      name: 'ui',
      // inherit testDir ('./tests')
      // don't run API specs under the UI project:
      testIgnore: ['tests/api/**'],
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        baseURL: 'https://the-internet.herokuapp.com',
        storageState: 'auth.json',
      },
    },

    // API project
    {
      name: 'api',
      testDir: 'tests/api',
      use: {
        baseURL: process.env.API_BASE_URL,   // e.g. https://api.realworld.io/api
        storageState: undefined,             // ensure no UI state leaks in
      },
    },
  ],
});