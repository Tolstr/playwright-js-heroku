The strategy for selectors is to use the most specific and reliable selectors available. In this case, using `getByLabel` for the username and password fields is preferred as it directly targets the input fields by their labels, which is more robust than using IDs or test IDs that may change or be less descriptive. The `getByLabel` method is part of Playwright's API that allows for more semantic and accessible selectors, making the tests easier to read and maintain.


Other selectors like `getByTestId` or `locator` are used when necessary, but the focus is on using the most descriptive and reliable selectors available. This approach helps ensure that the tests remain stable and less prone to breaking due to changes in the HTML structure or attributes.
[]: #      await page.locator('button[type="submit"]').click();
[]: #      await expect(page.locator('#flash')).toBeVisible();
[]: #      await expect(page.locator('#flash')).toContainText('Your username is invalid!');
[]: #  });  

In order to scale to larger test suites, the tests are structured to be modular and reusable. Each test case is focused on a specific functionality, such as logging in with valid credentials or handling invalid login attempts. This modular approach allows for easier maintenance and scalability as new features or test cases can be added without affecting existing ones.
[]: #  // Additional tests can be added here following the same structure
[]: #  // For example, tests for password reset, account creation, etc.

Automated test suite for [the-internet.herokuapp.com/login](https://the-internet.herokuapp.com/login) using Playwright.

## What’s Covered

- Valid login
- Invalid login
- Logout flow

## How to Run
npx playwright test
npx playwright --headed
npx playwright --debug