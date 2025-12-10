import { expect } from '@playwright/test';
import { getPriceLabelForPrices, calculateSubtotal } from '../utils/helpers';

export class CartWorkflows {
  constructor(shopPage, dialogWorkflows) {
    this.cart = shopPage.cart;
    this.shopPage = shopPage;
    this.dialogWorkflows = dialogWorkflows;
  }

  async verifyCartCounter(expectedCount) {
    await expect(this.cart.counter).toHaveText(String(expectedCount));
  }

  async verifyProductsInCart(products) {
    for (const product of products) {
      const productRow = this.shopPage.getProductRowInCart(product.name);
      await expect(productRow.rootEl).toBeVisible();
      await expect(productRow.priceLabel).toHaveText(
        getPriceLabelForPrices(product.price)
      );
    }
  }

  async verifySubtotal(products) {
    const prices = products.map(p => p.price);
    await expect(this.cart.subTotalLabel).toHaveText(
      getPriceLabelForPrices(prices)
    );
  }

  async verifyProductCount(expectedCount) {
    await expect(this.cart.productRows).toHaveCount(expectedCount);
  }

  async checkout(products) {
    const subtotal = calculateSubtotal(products);
    const alertPromise = this.dialogWorkflows.handleCheckoutAlert(subtotal);
    await this.cart.checkoutButton.click();
    await alertPromise;
  }

  async closeCartAndVerifyCounterPersists(expectedCount) {
    await this.shopPage.cart.closeButton.click();
    await expect(this.shopPage.cart.contentBlock).toBeHidden();
    await expect(this.shopPage.getCartCounter).toHaveText(String(expectedCount));
  }
}
