import { expect } from '@playwright/test';
import { formatPrice } from '../../utility/utils/helpers';
import { Page } from '@playwright/test';

export class DialogWorkflows {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async handleCheckoutAlert(expectedSubtotal: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Dialog was not triggered within timeout'));
      }, 5000);

      this.page.once('dialog', async (dialog) => {
        clearTimeout(timeoutId);
        try {
          const formattedPrice = formatPrice(expectedSubtotal);
          expect(dialog.message()).toBe(`Checkout - Subtotal: ${formattedPrice}`);
          await dialog.accept();
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}
