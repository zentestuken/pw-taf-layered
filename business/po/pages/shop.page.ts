import { Page, Locator } from '@playwright/test';
import { IBasePage } from '../../../types/page-object.types';
import ProductCard from '../components/productCard.component';
import Cart from '../components/cart.component';
import ProductRowInCart from '../components/productRowInCart.component';

export default class ShopPage implements IBasePage {
  readonly page: Page;
  readonly url: string;
  readonly cart: Cart;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.url = `${baseUrl}/`;
    this.cart = new Cart(page);
  }

  async open(): Promise<void> {
    await this.page.goto(this.url);
  }

  get productCards(): Locator {
    return this.page.locator('[class^="Product__Container"]');
  }

  getProductCard(productName: string): ProductCard {
    return new ProductCard(this.page, productName);
  }

  getProductRowInCart(productName: string): ProductRowInCart {
    return new ProductRowInCart(this.page, productName);
  }

  async getProductCounterText(): Promise<number | null> {
    const locator = this.page.locator(':has-text(" Product(s) found")');
    const textContent = await locator.textContent();
    const match = textContent?.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }

  getSizeFilter(size: string): Locator {
    return this.page.getByRole('button', { name: size });
  }

  get getCartCounter(): Locator {
    return this.page.locator('div[class^="Cart__CartQuantity"]');
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.getProductCard(productName);
    await product.addToCartButton.click();
  }
}
