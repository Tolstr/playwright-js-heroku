import {test, expect} from '@playwright/test';

const baseURL = 'https://the-internet.herokuapp.com';

test.describe('Login Flow', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(baseURL + '/login');
    });

    
    test('Valid login', async ({page}) => {
        await page.getByLabel('Username').fill('tomsmith');
        await page.getByLabel('password').fill('SuperSecretPassword!');
        await page.locator('button[type="submit"]').click();

        await expect(page.locator('#flash')).toBeVisible();
        await expect(page.locator('#flash')).toHaveText('You logged into a secure area!');
        await page.locator('a[href="/logout"]').click();
        await expect(page.locator('#flash')).toHaveText('You logged out of the secure area!');
        await expect(page.locator('#flash')).toBeVisible();
    });


    test('Invalid login and invalid password', async ({page}) => {
        await page.getByLabel('Username').fill('invalidUser');
        await page.getByLabel('password').fill('invalidPassword');
        await page.locator('button[type="submit"]').click();

        await expect(page.locator('#flash')).toBeVisible();
        await expect(page.locator('#flash')).toHaveText('Your Username is invalid!');
    });


    test ('Empty credentials', async ({page}) => {
        await page.locator('button[type="submit"]').click();

        await expect(page.locator('#flash')).toBeVisible();
        await expect(page.locator('#flash')).toHaveText('Your Username is invalid!');
    });


    test('Valid Username and wrong password', async ({page}) => {
        await page.getByLabel('Username').fill('tomsmith');
        await page.getByLabel('password').fill('WrongPassword!');
        await page.locator('button[type="submit"]').click();

        await expect(page.locator('#flash')).toBeVisible();
        await expect(page.locator('#flash')).toHaveText('Your password is invalid!');
    });
});