import { ProductRepository } from './repositories/product.repository';
import shopConfig from './fixtures/products.json';

export class TestData {
  constructor() {
    this.productRepo = new ProductRepository();
  }

  get shopPageTitle() {
    return shopConfig.shopPage.title;
  }

  get defaultProductsCount() {
    return shopConfig.shopPage.defaultProductsCount;
  }

  getProduct(index) {
    return this.productRepo.getByIndices([index])[0];
  }

  getProducts(indices) {
    return this.productRepo.getByIndices(indices);
  }

  getProductByName(name) {
    return this.productRepo.getByName(name);
  }

  getMultipleProducts(count = 2) {
    return this.productRepo.getMultiple(count);
  }
}

export default new TestData();
