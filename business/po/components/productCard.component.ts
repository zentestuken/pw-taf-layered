import { Locator, Page } from '@playwright/test';
import { IComponent } from '../../../types/page-object.types';
  
export default class ProductCard implements IComponent {
  readonly rootEl: Locator;

  constructor(page: Page, productName: string) {
    this.rootEl = page.locator('[class^="Product__Container"]').filter({ hasText: productName }).first();
  }

  get addToCartButton (): Locator { return this.rootEl.getByRole('button', { name: 'Add to cart' }); };
  get priceLabel (): Locator { return this.rootEl.locator('div[class^="Product__Price"]') };
}
