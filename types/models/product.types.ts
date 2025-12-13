export interface ProductData {
  id: string;
  name: string;
  price: string;
  sizes?: string[];
  category?: string;
}

export interface Product {
  name: string;
  price: string;
  size?: string | null;
  category?: string | null;
}

export interface ProductsFixture {
  products: ProductData[];
  shopPage: ShopConfig;
}

export interface ShopConfig {
  title: string;
  defaultProductsCount: number;
}
