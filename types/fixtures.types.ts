import ShopPage from '../business/po/pages/shop.page';
import { ShopWorkflows } from '../business/workflows/shop.workflows';
import { CartWorkflows } from '../business/workflows/cart.workflows';
import { DialogWorkflows } from '../business/workflows/dialog.workflows';
import { ShopAssertions } from '../presentation/assertions/shop.assertions';
import { CartAssertions } from '../presentation/assertions/cart.assertions';
import { TestData } from '../data-access/testData';

export interface TestFixtures {
  shopPage: ShopPage;
  shopWorkflows: ShopWorkflows;
  cartWorkflows: CartWorkflows;
  dialogWorkflows: DialogWorkflows;
  shopAssertions: ShopAssertions;
  cartAssertions: CartAssertions;
  testData: TestData;
}
