import { Product, ProductData } from '../../types/models/product.types';

export class ProductBuilder {
  private product: Product;

  constructor() {
    this.product = {
      name: '',
      price: '0.00',
      size: null,
      category: null,
    };
  }

  withName(name: string): this {
    this.product.name = name;
    return this;
  }

  withPrice(price: number | string): this {
    this.product.price = typeof price === 'number' ? price.toFixed(2) : price;
    return this;
  }

  withSize(size: string): this {
    this.product.size = size;
    return this;
  }

  withCategory(category: string): this {
    this.product.category = category;
    return this;
  }

  build(): Product {
    return { ...this.product };
  }

  static fromTestData(productData: ProductData): Product {
    return new ProductBuilder()
      .withName(productData.name)
      .withPrice(productData.price)
      .build();
  }
}
