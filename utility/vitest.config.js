import { defineConfig } from 'vitest/config'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

export default defineConfig({
  test: {
    globals: true,
    include: [path.resolve(projectRoot, 'presentation/tests/**/*.spec.js').replace(/\\/g, '/')],
    globalSetup: path.resolve(projectRoot, 'utility/vitest-setup/global-setup.js'),
    setupFiles: ['allure-vitest/setup'],
    testTimeout: 30000,
    threads: parseInt(process.env.THREADS || '1', 10),
    teardownTimeout: 20000,
    reporters: [
      "verbose",
      [
        "allure-vitest/reporter",
        {
          resultsDir: path.resolve(projectRoot, 'artifacts/allure-results'),
        },
      ],
    ],
  },
})
