import productsFixture from '../fixtures/products.json';
import { ProductBuilder } from '../builders/product.builder';

export class ProductRepository {
  constructor() {
    this.products = productsFixture.products;
  }

  getById(id) {
    const product = this.products.find(p => p.id === id);
    return product ? ProductBuilder.fromTestData(product) : null;
  }

  getByName(name) {
    const product = this.products.find(p => p.name === name);
    return product ? ProductBuilder.fromTestData(product) : null;
  }

  getByIndices(indices) {
    return indices
      .map(i => this.products[i])
      .filter(Boolean)
      .map(p => ProductBuilder.fromTestData(p));
  }

  getMultiple(count = 2) {
    return this.products
      .slice(0, count)
      .map(p => ProductBuilder.fromTestData(p));
  }

  getAll() {
    return this.products.map(p => ProductBuilder.fromTestData(p));
  }

  getTotalCount() {
    return this.products.length;
  }
}
