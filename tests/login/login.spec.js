import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage.js'; 


test.describe('Login Flow', () => {
    let loginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });


    test('Valid login', async () => {
        await loginPage.login('tomsmith', 'SuperSecretPassword!');
        await loginPage.assertLoginMessage('You logged into a secure area!');
    });

    test('Invalid login and invalid password', async () => {
        await loginPage.login('invalidUser', 'invalidPassword');
        await loginPage.assertLoginMessage('Your username is invalid!');
    });
        test('Empty credentials', async () => {
            await loginPage.login('', '');
            await loginPage.assertLoginMessage('Your username is invalid!');
        });
    
            test('Valid username and wrong password', async () => {
                await loginPage.login('tomsmith', 'WrongPassword!');
                await loginPage.assertLoginMessage('Your password is invalid!');
            });
    });