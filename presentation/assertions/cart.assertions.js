import { expect } from '@playwright/test';
import { getPriceLabelForPrices } from '../../utility/utils/helpers';

export class CartAssertions {
  constructor(cart) {
    this.cart = cart;
  }

  async verifyCartVisible() {
    await expect(this.cart.contentBlock).toBeVisible();
  }

  async verifyCartHidden() {
    await expect(this.cart.contentBlock).toBeHidden();
  }

  async verifyCounter(expectedCount) {
    await expect(this.cart.counter).toHaveText(String(expectedCount));
  }

  async verifyProductCount(expectedCount) {
    await expect(this.cart.productRows).toHaveCount(expectedCount);
  }

  async verifySubtotal(products) {
    const prices = products.map(p => p.price);
    const expectedLabel = getPriceLabelForPrices(prices);
    await expect(this.cart.subTotalLabel).toHaveText(expectedLabel);
  }

  async verifyProductInCart(productRow) {
    await expect(productRow.rootEl).toBeVisible();
  }

  async verifyProductPrice(productRow, expectedPrice) {
    await expect(productRow.priceLabel).toHaveText(
      getPriceLabelForPrices(expectedPrice)
    );
  }
}
