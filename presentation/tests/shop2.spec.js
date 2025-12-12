import { test } from '../../utility/fixtures';

test('Subtotal calculated correctly when products added to cart', async ({ shopWorkflows, cartWorkflows, cartAssertions, testData }) => {
  const products = testData.getProducts([0, 1]);
  
  await shopWorkflows.openShopAndVerifyLoaded();
  await shopWorkflows.addMultipleProductsToCart(products);
  
  await cartAssertions.verifyCartVisible();
  await cartWorkflows.verifyProductsInCart(products);
  await cartAssertions.verifyProductCount(2);
  await cartAssertions.verifyCounter(2);
  await cartAssertions.verifySubtotal(products);
});

test('Verify checkout alert with one product', async ({ shopWorkflows, cartWorkflows, testData }) => {
  
  const product = testData.getProduct(0);
  
  await shopWorkflows.openShopAndVerifyLoaded();
  await shopWorkflows.addProductToCartAndVerify(product);
  await cartWorkflows.checkout(product);
});
