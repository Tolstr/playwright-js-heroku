import {test, expect} from '@playwright/test';

const baseURL = 'https://the-internet.herokuapp.com';

test.describe('Login Tests', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(baseURL + '/login');
    });

    test('User should be able to login and logout successfully', async ({page}) => {
        await page.getByLabel('username').fill('tomsmith');
        await page.getByLabel('password').fill('SuperSecretPassword!');
        await page.locator('button[type="submit"]').click();

        await expect(page.locator('#flash')).toBeVisible();
        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
        await page.locator('a[href="/logout"]').click();
        await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
        await expect(page.locator('#flash')).toBeVisible();
    });

    test.only('User should not be able to login with invalid credentials', async ({page}) => {
        await page.getByLabel('username').fill('invalidUser');
        await page.getByLabel('password').fill('invalidPassword');
        await page.locator('button[type="submit"]').click();

        await expect(page.locator('#flash')).toBeVisible();
        await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    });
});