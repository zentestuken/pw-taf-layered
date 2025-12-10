import { createTestContext } from '../vitest-setup/fixtures';

const context = createTestContext();

test('Subtotal calculated correctly when products added to cart', async () => {
  const { shopWorkflows, cartWorkflows, cartAssertions, testData } = context;
  
  const products = testData.getProducts([0, 1]);
  
  await shopWorkflows.openShopAndVerifyLoaded();
  await shopWorkflows.addMultipleProductsToCart(products);
  
  await cartAssertions.verifyCartVisible();
  await cartWorkflows.verifyProductsInCart(products);
  await cartAssertions.verifyProductCount(2);
  await cartAssertions.verifyCounter(2);
  await cartAssertions.verifySubtotal(products);
});

test('Verify checkout alert with one product', async () => {
  const { shopWorkflows, cartWorkflows, testData } = context;
  
  const product = testData.getProduct(0);
  
  await shopWorkflows.openShopAndVerifyLoaded();
  await shopWorkflows.addProductToCartAndVerify(product);
  await cartWorkflows.checkout(product);
});
