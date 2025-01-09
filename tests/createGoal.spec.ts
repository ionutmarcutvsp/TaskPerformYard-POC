import { CreateGoalPage } from '../pages/CreateGoalPage'
import { faker } from '@faker-js/faker';
import { getDateBeforeToday, getDateTomorrow } from '../utils/dateUtils';
import goalFormData from '../fixtures/goalFormData.json';
import goalFormErrorMessages from '../fixtures/goalFormErrorMessages.json';
import goalNameValidation from '../fixtures/goalNameValidation.json';
import { LoginPage } from '../pages/LoginPage';
import { test } from '@playwright/test';
import '../setup';

let createGoalPage: CreateGoalPage;
let loginPage: LoginPage;
let page: any;

// Adding beforeAll with the Login steps
test.beforeAll(async ({ browser }) => {
    // Create a browser context
    const context = await browser.newContext();
    page = await context.newPage();

    // Initialize the page objects
    loginPage = new LoginPage(page);
    createGoalPage = new CreateGoalPage(page);

    // Perform the login process using the page object
    const loginUrl = process.env.LOGIN_URL as string;
    const username = process.env.USERNAME as string;
    const password = process.env.PASSWORD as string;

    await loginPage.goto(loginUrl); // Use the Page Object Model to navigate to the login page
    await loginPage.login(username, password); // Use the Page Object Model to perform login
});

test.describe.serial('Goal Tests', () => {

    test('Validate Goal Name As A Mandatory Field', async ({ page }) => {
        // Go to create goal form page
      await createGoalPage.goToCreateGoalPage();
      await createGoalPage.clickCreateGoalButton();

      // Validate empty value in goal name
      await createGoalPage.addGoalName(goalNameValidation.invalidGoalName.empty);
      await createGoalPage.clickCreateGoalButton();
      await createGoalPage.validateErrorMessage(goalFormErrorMessages.goalNameError.text);

      // Validate one character value in goal name
      await createGoalPage.addGoalName(goalNameValidation.invalidGoalName.oneCharacter);
      await createGoalPage.clickCreateGoalButton();
      await createGoalPage.validateErrorMessage(goalFormErrorMessages.goalNameError.text);

      // Validate two character value in goal name
      await createGoalPage.addGoalName(goalNameValidation.invalidGoalName.twoCharacters);
      await createGoalPage.clickCreateGoalButton();
      await createGoalPage.validateErrorMessage(goalFormErrorMessages.goalNameError.text);

      // Validate three character value in goal name
      await createGoalPage.addGoalName(goalNameValidation.invalidGoalName.threeCharacters);
      await createGoalPage.clickCreateGoalButton();
      await createGoalPage.validateErrorMessage(goalFormErrorMessages.goalNameError.text);

      // Validate special character value in goal name
      await createGoalPage.addGoalName(goalNameValidation.invalidGoalName.specialCharacters);
      await createGoalPage.clickCreateGoalButton();
      await createGoalPage.validateErrorMessage(goalFormErrorMessages.goalNameError.text);

      // Validate special character and numbers value in goal name
      await createGoalPage.addGoalName(goalNameValidation.invalidGoalName.specialCharactersAndNumbers);
      await createGoalPage.clickCreateGoalButton();
      await createGoalPage.validateErrorMessage(goalFormErrorMessages.goalNameError.text);
    });

    test('Validate Due Date Error Message', async ({ page }) => {
        // Get yesterday date
        let yesterdayDate = getDateBeforeToday();
        // Generate a name for the goal
        let goalName = faker.person.firstName();

      // Validate the error message for due date if the date is before the start date
      await createGoalPage.addGoalName(goalName);
      await createGoalPage.addDueDate(yesterdayDate);
      await createGoalPage.clickCreateGoalButton();
      await createGoalPage.validateErrorMessage(goalFormErrorMessages.goalDueDateError.text);
    });

    test('Create A Valid Goal', async ({ page }) => {
        // Generate a name for the goal
        let goalName = faker.person.firstName();
        // Get tomorrows date
        let tomorrowDate = getDateTomorrow();

      // Complete all the form data to create a goal
      await createGoalPage.addGoalName(goalName);
      await createGoalPage.addValueToTarget("80");
      await createGoalPage.addDueDate(tomorrowDate);
      await createGoalPage.addDescription(goalFormData.validGoal.description);
      await createGoalPage.selectCategory(goalFormData.validGoal.goalCategory);
      await createGoalPage.addGoalWeight(goalFormData.validGoal.goalWeight);
      await createGoalPage.clickCreateGoalButton();
      // Validate success message after the goal creation
      await createGoalPage.verifyGoalCreation(goalFormData.validGoal.successMessage);
    });
});