import { test } from '../../utility/fixtures';

test('Verify default product cards count', async ({ shopWorkflows, shopAssertions, testData }) => {
  await shopWorkflows.openShopAndVerifyLoaded();
  await shopAssertions.verifyPageTitle(testData.shopPageTitle);
  await shopAssertions.verifyProductCardsCount(testData.defaultProductsCount);
});

test('Product can be added to cart', async ({ shopWorkflows, cartWorkflows, cartAssertions, testData }) => {
  const product = testData.getProduct(0);
  
  await shopWorkflows.openShopAndVerifyLoaded();
  await shopWorkflows.addProductToCartAndVerify(product);
  await cartAssertions.verifyCounter(1);
  await cartWorkflows.closeCartAndVerifyCounterPersists(1);
});