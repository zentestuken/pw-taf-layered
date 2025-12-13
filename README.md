## Simple training TAF with Playwright and proper layered architecture

For simplicity, app under test is included in the repo (original - see https://github.com/jeffersonRibeiro/react-shopping-cart)

#### Branches:

- `vitest` - with Vitest test runner
- `pw-runner` - with Playwright test runner
- `typescript` - with Playwright test runner, full TS integration, more consistent layering 

#### Layers:

- Presentation (tests, reusable assertions)
- Business (PO files, business workflows)
- Data access (managing/retrieving test data)
- Utility (configs, fixtures, global setup)
