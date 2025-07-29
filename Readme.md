![Playwright Tests](https://github.com/Tolstr/playwright-js-heroku/actions/workflows/playwright.yml/badge.svg)


Day July 16/17, 2025:
Added dropdown.spec.js to test dropdown functionality on the login page.
Covered scenarios include selecting an option from the dropdown and verifying the selected value.
Was using for loop to iterate through options.
Added label type 'regression' to the test to categorize it for regression testing.
To run the tests, use the command:npx playwright test dropdown.spec.js --headed --debug   




Day 5:
⚠️ Note: The site https://the-internet.herokuapp.com does not persist sessions across browser contexts.
The "Session Reuse" test simulates login within the same test rather than relying on saved storage state.
This code is still a valid template for apps that do persist login sessions via cookies or local storage.


DAY 4:
Added testdata array for login tests to handle multiple test cases in a more structured way. This allows for easy addition of new test cases without duplicating code.


DAY 3
Why POM is important? Allows to reuse common functionality across multiple tests, making the code cleaner and easier to maintain.
What are the benefits of this structure? It promotes modularity, reusability, and separation of concerns, making it easier to manage and scale the test suite as the application grows.
What would you do next if the login page had CAPTCHA? You would need to implement a strategy to handle CAPTCHA, such as using a service to bypass it or mocking the CAPTCHA response in your tests. This might involve creating a separate test environment or using API calls to simulate successful login without CAPTCHA.


DAY 2:
Added 2 more tests for invalid login and empty credentials.
before each is porwerful to avouid code duplication.
Copilot accelerate the process so much faster. 
If you know what you are doing, the study session are quick and effective.
Gihub commands to add, commit and push are easy to remember with ACP - all cool projects goes to GitHub.





DAY 1:

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