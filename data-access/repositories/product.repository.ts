import productsFixture from '../fixtures/products.json';
import { ProductBuilder } from '../builders/product.builder';
import { Product, ProductData } from '../../types/models/product.types';

export class ProductRepository {
  private readonly products: ProductData[];

  constructor() {
    this.products = productsFixture.products;
  }

  getById(id: string): Product | null {
    const product = this.products.find(p => p.id === id);
    return product ? ProductBuilder.fromTestData(product) : null;
  }

  getByName(name: string): Product | null {
    const product = this.products.find(p => p.name === name);
    return product ? ProductBuilder.fromTestData(product) : null;
  }

  getByIndices(indices: number[]): Product[] {
    return indices
      .map(i => this.products[i])
      .filter((p): p is ProductData => Boolean(p))
      .map(p => ProductBuilder.fromTestData(p));
  }

  getMultiple(count: number = 2): Product[] {
    return this.products
      .slice(0, count)
      .map(p => ProductBuilder.fromTestData(p));
  }

  getAll(): Product[] {
    return this.products.map(p => ProductBuilder.fromTestData(p));
  }

  getTotalCount(): number {
    return this.products.length;
  }
}
