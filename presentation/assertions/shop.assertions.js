import { expect } from '@playwright/test';

export class ShopAssertions {
  constructor(shopPage) {
    this.shopPage = shopPage;
  }

  async verifyPageTitle(expectedTitle) {
    await expect(this.shopPage.page).toHaveTitle(expectedTitle);
  }

  async verifyProductCardsCount(expectedCount) {
    await expect(this.shopPage.productCards).toHaveCount(expectedCount);
  }

  async verifyProductCardsLoaded() {
    await expect(this.shopPage.productCards).not.toHaveCount(0);
  }

  async verifyCartCounterText(expectedText) {
    await expect(this.shopPage.getCartCounter).toHaveText(expectedText);
  }
}
