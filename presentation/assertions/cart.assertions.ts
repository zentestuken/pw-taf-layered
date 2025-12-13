import { expect } from '@playwright/test';
import { getPriceLabelForPrices } from '../../utility/utils/helpers';
import Cart from '../../business/po/components/cart.component';
import { Product } from '../../types/models/product.types';
import ShopPage from '../../business/po/pages/shop.page';

export class CartAssertions {
  private readonly cart: Cart;

  constructor(cart: Cart) {
    this.cart = cart;
  }

  async verifyCartVisible(): Promise<void> {
    await expect(this.cart.contentBlock).toBeVisible();
  }

  async verifyCounter(expectedCount: number): Promise<void> {
    await expect(this.cart.counter).toHaveText(String(expectedCount));
  }

  async verifyProductCount(expectedCount: number): Promise<void> {
    await expect(this.cart.productRows).toHaveCount(expectedCount);
  }

  async verifySubtotal(products: Product[]): Promise<void> {
    const prices = products.map(p => p.price);
    const expectedLabel = getPriceLabelForPrices(prices);
    await expect(this.cart.subTotalLabel).toHaveText(expectedLabel);
  }

  async verifyProductsInCart(products: Product[], shopPage: ShopPage): Promise<void> {
    for (const product of products) {
      const productRow = shopPage.getProductRowInCart(product.name);
      await expect(productRow.rootEl).toBeVisible();
      await expect(productRow.priceLabel).toHaveText(
        getPriceLabelForPrices(product.price)
      );
    }
  }

  async verifyHeaderCounter(expectedCount: number, shopPage: ShopPage): Promise<void> {
    await expect(shopPage.getCartCounter).toHaveText(String(expectedCount));
  }
}
