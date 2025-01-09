import { expect, Page, type Locator } from '@playwright/test';

export class CreateGoalPage {
  readonly page: Page;
  readonly categoryPicker: string;
  readonly categoryPickedValue: string;
  readonly createGoalButton: string;
  readonly dueDate: string;
  readonly description: string;
  readonly goalsName: string;
  readonly goalsNav: string;
  readonly goalsWeight: string;
  readonly target: string;

  constructor(page: Page) {
      this.page = page;
      this.categoryPicker = '#category-picker';
      this.categoryPickedValue = '[data-testid="chip-label"] p';
      this.createGoalButton = '[data-testid="createGoalButton"]';
      this.description = '[id="description"]';
      this.dueDate = '[id="due-date"]';
      this.goalsName = '[id="name"]';
      this.goalsNav = '[testid="goals-nav"]';
      this.goalsWeight = '[id="goal-weight"]';
      this.target = '[id="target"]';
  }

  /**
  * Clicks on go to goals page button.
  */
  async goToCreateGoalPage() {
      await this.page.click(this.goalsNav);
  }

  /**
  * Clicks on create goal button.
  */
  async clickCreateGoalButton() {
      await this.page.click(this.createGoalButton);
  }

  /**
  * Verifies adding goal name value.
  *
  * @param name - The goal name value that is used in goal creation.
  */
  async addGoalName(name: string) {
      await this.page.fill(this.goalsName, name);
  }

  /**
  * Verifies adding due date value.
  *
  * @param date - The due date value that is used in goal creation.
  */
  async addDueDate(date: string) {
      await this.page.fill(this.dueDate, date);
  }

  /**
  * Verifies adding target value.
  *
  * @param target - The target value that is used in goal creation.
  */
  async addValueToTarget(target: string) {
      await this.page.fill(this.target, target);
  }

  /**
  * Verifies adding description.
  *
  * @param descriptionValue - The description value that is used in goal creation.
  */
  async addDescription(descriptionValue: string) {
      await this.page.fill(this.description, descriptionValue);
  }

  /**
  * Verifies category selection.
  *
  * @param goalsWeightValue - The weight value that is used in goal creation.
  */
  async addGoalWeight(goalsWeightValue: string) {
      await this.page.fill(this.goalsWeight, goalsWeightValue);
  }

  /**
  * Verifies category selection.
  *
  * @param categoryType - The category that we select from the dropdown.
  */
  async selectCategory(categoryType: string) {
    await this.page.click(this.categoryPicker);
    await this.page.getByRole('option', { name: categoryType }).click();
    await expect(this.page.locator(this.categoryPickedValue, { hasText: categoryType })).toBeVisible();
  }

  /**
  * Verifies goal creation success message.
  *
  * @param message - The text in the success message.
  */
  async verifyGoalCreation(message: string) {
    const successMessage = this.page.locator('.message', { hasText: message });
    await expect(successMessage).toBeVisible();
  }

  /**
    * Verifies that the text from the error message is correct.
    *
    * @param errorText - The text in the error message.
  */
  async validateErrorMessage(errorText: string) {
      const errorLocator = this.page.locator(`//*[contains(text(),'${errorText}')]`)
      await expect(errorLocator).toHaveText(errorText);
  }
}