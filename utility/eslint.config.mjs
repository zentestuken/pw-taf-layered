import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/artifacts/**',
      '**/dist/**',
      '**/app/**',
    ],
  },
  
  // JavaScript files configuration
  {
    files: ["**/*.{js,mjs}"],
    ignores: ['**/eslint.config.mjs'],
    plugins: {
      js,
      playwright,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      'no-console': 'warn',
      'playwright/no-skipped-test': 'error',
      'playwright/no-focused-test': 'error',
    },
  },
  
  // TypeScript files configuration
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["**/*.ts"],
  })),
  {
    files: ["**/*.ts"],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      playwright,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project:  path.resolve(__dirname, '../tsconfig.json'),
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'no-console': 'warn',
      'playwright/no-skipped-test': 'error',
      'playwright/no-focused-test': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'playwright/expect-expect' : 'off',
    },
  },
]);
