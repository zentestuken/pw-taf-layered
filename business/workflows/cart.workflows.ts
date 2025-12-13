import { expect } from '@playwright/test';
import ShopPage from '../po/pages/shop.page';
import Cart from '../po/components/cart.component';
import { DialogWorkflows } from './dialog.workflows';
import { Product } from '../../types/models/product.types';
import { calculateSubtotal } from '../../utility/utils/helpers';

export class CartWorkflows {
  private readonly cart: Cart;
  private readonly shopPage: ShopPage;
  private readonly dialogWorkflows: DialogWorkflows;

  constructor(shopPage: ShopPage, dialogWorkflows: DialogWorkflows) {
    this.cart = shopPage.cart;
    this.shopPage = shopPage;
    this.dialogWorkflows = dialogWorkflows;
  }

  async closeCart(): Promise<void> {
    await this.cart.closeButton.click();
    await expect(this.shopPage.cart.contentBlock).toBeHidden(); // Sanity check
  }

  async checkout(products: Product | Product[]): Promise<void> {
    const productsArray = Array.isArray(products) ? products : [products];
    const subtotal = calculateSubtotal(productsArray);
    const alertPromise = this.dialogWorkflows.handleCheckoutAlert(subtotal);
    await this.cart.checkoutButton.click();
    await alertPromise;
  }
}
