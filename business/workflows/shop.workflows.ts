import { expect } from '@playwright/test';
import ShopPage from '../po/pages/shop.page';
import ProductRowInCart from '../po/components/productRowInCart.component';

export class ShopWorkflows {
  private readonly shopPage: ShopPage;

  constructor(shopPage: ShopPage) {
    this.shopPage = shopPage;
  }

  async openShopAndVerifyLoaded(): Promise<void> {
    await this.shopPage.open();
    await expect(this.shopPage.productCards).not.toHaveCount(0); // Sanity check
  }

  async addProductToCartAndVerify(product: { name: string }): Promise<ProductRowInCart> {
    await this.shopPage.addProductToCart(product.name);
    await expect(this.shopPage.cart.contentBlock).toBeVisible();
    
    const productRow = this.shopPage.getProductRowInCart(product.name);
    await expect(productRow.rootEl).toBeVisible();
    
    return productRow;
  }

  async addMultipleProductsToCart(products: Array<{ name: string }>): Promise<void> {
    for (const product of products) {
      await this.shopPage.addProductToCart(product.name);
    }
  }
}
