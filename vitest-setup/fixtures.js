import { beforeEach, afterEach, afterAll } from 'vitest';
import { chromium } from '@playwright/test';
import ShopPage from '../po/pages/shop.page';
import { ShopWorkflows } from '../workflows/shop.workflows';
import { CartWorkflows } from '../workflows/cart.workflows';
import { DialogWorkflows } from '../workflows/dialog.workflows';
import { ShopAssertions } from '../assertions/shop.assertions';
import { CartAssertions } from '../assertions/cart.assertions';
import TestData from '../data/testData';
import { baseUrl } from './global-setup';

let browser;

export const createTestContext = () => {
  const testContext = {};

  beforeEach(async () => {
    if (!browser) {
      browser = await chromium.launch();
    }

    testContext.page = await browser.newPage();
    testContext.shopPage = new ShopPage(testContext.page, baseUrl);

    // Business layer
    testContext.shopWorkflows = new ShopWorkflows(testContext.shopPage);
    testContext.dialogWorkflows = new DialogWorkflows(testContext.shopPage.page);
    testContext.cartWorkflows = new CartWorkflows(testContext.shopPage, testContext.dialogWorkflows);

    // Assertion layer
    testContext.shopAssertions = new ShopAssertions(testContext.shopPage);
    testContext.cartAssertions = new CartAssertions(testContext.shopPage.cart);

    // Data layer
    testContext.testData = TestData;
  });

  afterEach(async () => {
    if (testContext.page) {
      await testContext.page.close();
    }
  });

  return testContext;
};

// Global browser cleanup
afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});
