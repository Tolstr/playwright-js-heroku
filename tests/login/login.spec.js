import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage.js'; 


const loginData = [
    { 
        username: 'tomsmith', 
        password: 'SuperSecretPassword!', 
        expectedMessage: 'You logged into a secure area!',
        isSuccess: true 
    },
    { 
        username: 'invalidUser', 
        password: 'invalidPassword', 
        expectedMessage: 'Your username is invalid!',
        isSuccess: false 
    },
    { 
        username: '', 
        password: '', 
        expectedMessage: 'Your username is invalid!',
        isSuccess: false 
    },
    { 
        username: 'tomsmith', 
        password: 'WrongPassword!', 
        expectedMessage: 'Your password is invalid!',
        isSuccess: false 
    }
];

test.describe('Data-Driven Login Flow', () => {
    let loginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    loginData.forEach(({username, password, expectedMessage, isSuccess}) => {
        test(`Login with username: "${username}" and password: "${password}"`, async () => {
            await loginPage.login(username, password);
            await loginPage.assertLoginMessage(expectedMessage);
            if (isSuccess) {
                await loginPage.logout();
                await loginPage.assertLogoutMessage('You logged out of the secure area!');
            }
        });
    }); 
    });