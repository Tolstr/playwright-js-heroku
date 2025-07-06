// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
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
      },
    },
  ],
});
