# Playwright Automation Framework

This repository contains a Playwright automation framework for testing web applications using TypeScript and the Page Object Model (POM). The framework includes responsive testing across different screen sizes, using fixtures and utilities for managing test data.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Test Structure](#test-structure)
- [Running Tests](#running-tests)
- [Fixtures](#fixtures)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ionutmarcutvsp/task-performyard.git
    cd TaskPerformyard
    ```

2. **Install dependencies:**

   Ensure you have Node.js installed (Node version 12 or higher is recommended). Then run:

    ```bash
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory of the project with the following content:

    ```env
    LOGIN_URL=https://example.com/login
    USERNAME=your_username
    PASSWORD=your_password
    ```

   Replace the values with your actual login credentials.

## Usage

- **Test Structure:**

  Your tests are organized into directories. Each page object is located in the `pages` directory, and specs are located in the `tests` directory. You can also find various utilities in the `utils` directory.

- **Creating New Tests:**

  To create a new test:
    1. Add a new file with a `.test.ts` extension inside the `tests` directory.
    2. Import the necessary page objects.
    3. Write your test cases using Playwright's API.


## **Running Tests**

### **1. Run All Tests**
To execute all tests using the login setup and save session storage use:
```bash
npx playwright test --config=playwright.config.ts
```

To execute all tests and follow the UI use:
```bash
npx playwright test --ui
```

### **3. Generate Reports**
Playwright automatically generates HTML reports. To open the report after running tests:
```bash
npx playwright show-report
```

### **4. Specific Test File**
Run a specific test file (e.g., `createGoal.spec.ts`):
```bash
npx playwright test tests/createGoal.spec.ts
```

## Fixtures

The framework includes a fixtures directory that contains JSON data for various scenarios for filling out the form
