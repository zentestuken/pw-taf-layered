export const getPriceLabelForPrices = (prices) => {
  const priceLabels = Array.isArray(prices) ? prices : [prices];
  const sum = priceLabels
    .reduce((acc, priceLabel) => acc + parseFloat(priceLabel), 0)
    .toFixed(2);
  return new RegExp(`^\\$\\s*${sum}`);
};

export const calculateSubtotal = (products) => {
  const productList = Array.isArray(products) ? products : [products];
  return productList
    .reduce((sum, product) => sum + parseFloat(product.price), 0)
    .toFixed(2);
};

export const formatPrice = (price) => {
  return `$ ${parseFloat(price).toFixed(2)}`;
};
