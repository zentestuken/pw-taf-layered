import { expect } from '@playwright/test';
import { formatPrice } from '../../utility/utils/helpers';

export class DialogWorkflows {
  constructor(page) {
    this.page = page;
  }

  async handleCheckoutAlert(expectedSubtotal) {
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
