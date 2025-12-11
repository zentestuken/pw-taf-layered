import { beforeEach, afterEach, afterAll } from 'vitest';
import { chromium } from '@playwright/test';
import ShopPage from '../../business/po/pages/shop.page';
import { ShopWorkflows } from '../../business/workflows/shop.workflows';
import { CartWorkflows } from '../../business/workflows/cart.workflows';
import { DialogWorkflows } from '../../business/workflows/dialog.workflows';
import { ShopAssertions } from '../../presentation/assertions/shop.assertions';
import { CartAssertions } from '../../presentation/assertions/cart.assertions';
import TestData from '../../data-access/testData';
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

    testContext.shopWorkflows = new ShopWorkflows(testContext.shopPage);
    testContext.dialogWorkflows = new DialogWorkflows(testContext.shopPage.page);
    testContext.cartWorkflows = new CartWorkflows(testContext.shopPage, testContext.dialogWorkflows);

    testContext.shopAssertions = new ShopAssertions(testContext.shopPage);
    testContext.cartAssertions = new CartAssertions(testContext.shopPage.cart);

    testContext.testData = TestData;
  });

  afterEach(async () => {
    if (testContext.page) {
      await testContext.page.close();
    }
  });

  return testContext;
};

afterAll(async () => {
  if (browser) {
    await browser.close();
  }
});
