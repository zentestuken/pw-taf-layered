import { expect } from '@playwright/test';

export class ShopWorkflows {
  constructor(shopPage) {
    this.shopPage = shopPage;
  }

  async openShopAndVerifyLoaded() {
    await this.shopPage.open();
    await expect(this.shopPage.productCards).not.toHaveCount(0);
  }

  async addProductToCartAndVerify(product) {
    await this.shopPage.addProductToCart(product.name);
    await expect(this.shopPage.cart.contentBlock).toBeVisible();
    
    const productRow = this.shopPage.getProductRowInCart(product.name);
    await expect(productRow.rootEl).toBeVisible();
    
    return productRow;
  }

  async addMultipleProductsToCart(products) {
    for (const product of products) {
      await this.shopPage.addProductToCart(product.name);
    }
  }
}
