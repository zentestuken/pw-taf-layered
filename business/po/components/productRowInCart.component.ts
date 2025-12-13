import { Locator, Page } from '@playwright/test';
import { IComponent } from '../../../types/page-object.types';
  
export default class ProductRowInCart implements IComponent {
  readonly rootEl: Locator;

  constructor(page: Page, productName: string) {
    this.rootEl = page.locator('[class^="CartProduct__Container"]').filter({ hasText: productName }).first();
  }

  get plusButton (): Locator { return this.rootEl.getByRole('button', { name: '+' }); }
  get minusButton (): Locator { return this.rootEl.getByRole('button', { name: '-' }); }
  get priceLabel (): Locator { return this.rootEl.locator('div[class^="CartProduct__Price"] p'); }

  increaseQuantity () {
    return this.plusButton.click();
  }

  decreaseQuantity () {
    return this.minusButton.click();
  }
}
