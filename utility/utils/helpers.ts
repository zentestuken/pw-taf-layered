import { Product } from '../../types/models/product.types';

export function getPriceLabelForPrices(price: string | string[]): string {
  if (Array.isArray(price)) {
    const total = price.reduce((sum, p) => sum + parseFloat(p), 0);
    return `$ ${total.toFixed(2)}`;
  }
  return `$ ${price}`;
}

export function calculateSubtotal(products: Product[]): string {
  const total = products.reduce((sum, p) => sum + parseFloat(p.price), 0);
  return total.toFixed(2);
}

export const formatPrice = (price: string) => {
  return `$ ${parseFloat(price).toFixed(2)}`;
};
