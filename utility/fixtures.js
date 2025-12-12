import { test as base } from '@playwright/test';
import ShopPage from '../business/po/pages/shop.page';
import { ShopWorkflows } from '../business/workflows/shop.workflows';
import { CartWorkflows } from '../business/workflows/cart.workflows';
import { DialogWorkflows } from '../business/workflows/dialog.workflows';
import { ShopAssertions } from '../presentation/assertions/shop.assertions';
import { CartAssertions } from '../presentation/assertions/cart.assertions';
import TestData from '../data-access/testData';

export const test = base.extend({
  shopPage: async ({ page, baseURL }, use) => {
    const shopPage = new ShopPage(page, baseURL);
    await use(shopPage);
  },

  shopWorkflows: async ({ shopPage }, use) => {
    await use(new ShopWorkflows(shopPage));
  },

  cartWorkflows: async ({ shopPage }, use) => {
    const dialogWorkflows = new DialogWorkflows(shopPage.page);
    await use(new CartWorkflows(shopPage, dialogWorkflows));
  },

  dialogWorkflows: async ({ shopPage }, use) => {
    await use(new DialogWorkflows(shopPage.page));
  },

  shopAssertions: async ({ shopPage }, use) => {
    await use(new ShopAssertions(shopPage));
  },

  cartAssertions: async ({ shopPage }, use) => {
    await use(new CartAssertions(shopPage.cart));
  },

  // eslint-disable-next-line no-empty-pattern
  testData: async ({}, use) => {
    await use(TestData);
  },
});

export { expect } from '@playwright/test';
