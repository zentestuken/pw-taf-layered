import { Page, Locator } from '@playwright/test';

export interface IBasePage {
  page: Page;
  url: string;
  open(): Promise<void>;
}

export interface IComponent {
  rootEl: Locator;
}
