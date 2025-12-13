import { Locator, Page } from '@playwright/test';
import { IComponent } from '../../../types/page-object.types';

export default class Cart implements IComponent {
  readonly rootEl: Locator;

  constructor(page: Page) {
    this.rootEl = page.locator('[class^="Cart__Container"]');
  }

  get closeButton(): Locator {
    return this.rootEl.getByRole('button', { name: 'X' });
  }

  get emptyMessageBlock(): Locator {
    return this.rootEl.locator('div[class^="CartProducts__CartProductsEmpty"]');
  }

  get checkoutButton(): Locator {
    return this.rootEl.getByRole('button', { name: 'Checkout' });
  }

  get subTotalLabel(): Locator {
    return this.rootEl.locator('[class^="Cart__SubPriceValue"]');
  }

  get contentBlock(): Locator {
    return this.rootEl.locator('div[class^="Cart__CartContent-"]');
  }

  get productRows(): Locator {
    return this.rootEl.locator('[class^="CartProduct__Container"]');
  }

  get counter(): Locator {
    return this.rootEl.locator('div[class^="Cart__CartQuantity"]');
  }
}
