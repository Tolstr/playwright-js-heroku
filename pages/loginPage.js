import { expect } from '@playwright/test';

export class LoginPage {
    constructor (page) {
        this.page = page;
        this.usernameField = page.getByLabel('Username');
        this.passwordField = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.flashMessage = page.locator('#flash');
    }
    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/login');
    }
    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
    async assertLoginMessage(expectedMessage) {
        await expect(this.flashMessage).toBeVisible();
        await expect(this.flashMessage).toContainText(expectedMessage);
    }
    async logout() {
        await this.page.locator('a[href="/logout"]').click();
    }
    async assertLogoutMessage(expectedMessage) {
        await expect(this.flashMessage).toBeVisible();
        await expect(this.flashMessage).toContainText(expectedMessage);
    }
}