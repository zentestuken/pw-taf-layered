import { expect } from '@playwright/test';
import ShopPage from '../../business/po/pages/shop.page';

export class ShopAssertions {
  private readonly shopPage: ShopPage;

  constructor(shopPage: ShopPage) {
    this.shopPage = shopPage;
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.shopPage.page).toHaveTitle(expectedTitle);
  }

  async verifyProductCardsCount(expectedCount: number): Promise<void> {
    await expect(this.shopPage.productCards).toHaveCount(expectedCount);
  }

  async verifyCartCounterText(expectedText: string): Promise<void> {
    await expect(this.shopPage.getCartCounter).toHaveText(expectedText);
  }
}