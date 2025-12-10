export class ProductBuilder {
  constructor() {
    this.product = {
      name: '',
      price: '0.00',
      size: null,
      category: null,
    };
  }

  withName(name) {
    this.product.name = name;
    return this;
  }

  withPrice(price) {
    this.product.price = typeof price === 'number' ? price.toFixed(2) : price;
    return this;
  }

  withSize(size) {
    this.product.size = size;
    return this;
  }

  withCategory(category) {
    this.product.category = category;
    return this;
  }

  build() {
    return { ...this.product };
  }

  static fromTestData(productData) {
    return new ProductBuilder()
      .withName(productData.name)
      .withPrice(productData.price)
      .build();
  }
}
