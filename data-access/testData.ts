// data-access/testData.ts
import { ProductRepository } from './repositories/product.repository';
import shopConfig from './fixtures/products.json';
import { Product, ShopConfig } from '../types/models/product.types';

export class TestData {
  private readonly productRepo: ProductRepository;
  private readonly config: ShopConfig;

  constructor() {
    this.productRepo = new ProductRepository();
    this.config = shopConfig.shopPage;
  }

  get shopPageTitle(): string {
    return this.config.title;
  }

  get defaultProductsCount(): number {
    return this.config.defaultProductsCount;
  }

  getProduct(index: number): Product {
    const products = this.productRepo.getByIndices([index]);
    if (products.length === 0) {
      throw new Error(`Product at index ${index} not found`);
    }
    return products[0];
  }

  getProducts(indices: number[]): Product[] {
    return this.productRepo.getByIndices(indices);
  }

  getProductByName(name: string): Product | null {
    return this.productRepo.getByName(name);
  }

  getMultipleProducts(count: number = 2): Product[] {
    return this.productRepo.getMultiple(count);
  }
}

export default new TestData();
