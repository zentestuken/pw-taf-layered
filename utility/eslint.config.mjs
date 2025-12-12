import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import playwright from 'eslint-plugin-playwright';

export default defineConfig([
  {
    ...playwright.configs['flat/recommended'],
    files: ["**/*.{js,mjs,ts}"],
      ignores: [
        '**/node_modules/**',
        '**/artifacts/**',
        '**/eslint.config.mjs',
        '**/app/**',
    ],
    plugins: {
      js,
      playwright,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        browser: true,
        context: true,
        page: true,
        test: true,
        expect: true,
        process: true,
        beforeEach: 'readonly',
        afterEach: 'readonly',
        test: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
      },
    },
    extends: ["js/recommended"],
    rules: {
      'no-console': 'warn',
      'playwright/no-skipped-test': 'error',
      'playwright/no-focused-test': 'error',
    },
  },
]);
