import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: string;
  readonly passwordInput: string;
  readonly loginButton: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = '[data-testid="emailInput"]';
    this.passwordInput = '[data-testid="passwordInput"]';
    this.loginButton = '[data-testid="signInButton"]';
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);

  }
}