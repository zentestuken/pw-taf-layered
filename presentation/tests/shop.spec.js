import { createTestContext } from '../../utility/vitest-setup/fixtures';

const context = createTestContext();

test('Verify default product cards count', async () => {
  const { shopWorkflows, shopAssertions, testData } = context;
  
  await shopWorkflows.openShopAndVerifyLoaded();
  await shopAssertions.verifyPageTitle(testData.shopPageTitle);
  await shopAssertions.verifyProductCardsCount(testData.defaultProductsCount);
});

test('Product can be added to cart', async () => {
  const { shopWorkflows, cartWorkflows, cartAssertions, testData } = context;
  
  const product = testData.getProduct(0);
  
  await shopWorkflows.openShopAndVerifyLoaded();
  await shopWorkflows.addProductToCartAndVerify(product);
  await cartAssertions.verifyCounter(1);
  await cartWorkflows.closeCartAndVerifyCounterPersists(1);
});
