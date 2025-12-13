import { defineConfig } from '@playwright/test';
import path from 'path';

const serverUrl = 'http://localhost:3000';

export default defineConfig({
  testDir: path.resolve(__dirname, '../presentation/tests'),
  outputDir: path.resolve(__dirname, '../artifacts/test-results'),
  fullyParallel: true,
  workers: Number(process.env.WORKERS) || 2,
  timeout: 30000,
  use: {
    baseURL: serverUrl,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  reporter: [
    ['list'],
    ['allure-playwright', {
      resultsDir: path.resolve(__dirname, '../artifacts/allure-results'),
      clearFiles: true,
    }],
  ],
  webServer: {
    command: 'npm run start',
    url: serverUrl,
    cwd: path.resolve(__dirname, '../app'),
    reuseExistingServer: !process.env.CI,
    timeout: 40 * 1000,
  },
});
