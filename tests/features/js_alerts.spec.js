import { test, expect } from '@playwright/test';
test.describe('JS Alerts', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    });
    test('Handle JS Alert, click OK', async ({ page }) => {
        page.once('dialog', async dialog => {
            expect (dialog.message()).toBe('I am a JS Alert');
            await dialog.accept();         
        });
        await page.click('text=Click for JS Alert');
        await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
    });
    test('Handle JS Confirm - OK', async ({ page }) => {
        page.once('dialog', async dialog => {
            expect (dialog.message()).toBe('I am a JS Confirm');
            await dialog.accept();         
        });
        await page.click('text=Click for JS Confirm');
        await expect(page.locator('#result')).toHaveText('You clicked: Ok');
    });
    test('Handle JS Confirm - Cancel', async ({ page }) => {
        page.once('dialog', async dialog => {
            expect (dialog.message()).toBe('I am a JS Confirm');
            await dialog.dismiss();         
        });
        await page.click('text=Click for JS Confirm');
        await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
    });
    test('Handle JS Prompt - input text and click OK', async ({ page }) => {
        const inputText = 'Playwright Test';
        page.once('dialog', async dialog => {
            expect (dialog.message()).toBe('I am a JS prompt');
            await dialog.accept(inputText);         
        });
        await page.click('text=Click for JS Prompt');
        await expect(page.locator('#result')).toHaveText(`You entered: ${inputText}`);
    });
    test('Handle JS Prompt - click Cancel', async ({ page }) => {
        page.once('dialog', async dialog => {
            expect (dialog.message()).toBe('I am a JS prompt');
            await dialog.dismiss();         
        });
        await page.click('text=Click for JS Prompt');
        await expect(page.locator('#result')).toHaveText('You entered: null');
    });
}); 