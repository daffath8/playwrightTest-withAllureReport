import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec';
import { loginUsers } from '../test-data/user';


test('Login Success', async ({ page }) => {
    const loginPage = new LoginPage(page);

    const user = loginUsers.standardUser;

    await test.step('Open Login Page', async () => {
        await loginPage.open();
    });

    await test.step('Perform Login', async () => {
        await loginPage.login(
            user.username,
            user.password);
    });

    await test.step('Verify Successful Login', async () => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(loginPage.pageTitle).toBeVisible();
        await expect(loginPage.pageTitle).toHaveText('Products');
    });
});

test('Login Failure (Invalid Username)', async ({ page }) => { 
    const loginPage = new LoginPage(page);

    await test.step('Open Login Page', async () => {
        await loginPage.open();
    });

    await test.step('Perform Login', async () => {
        await loginPage.login('standard', 'secret_sauce');
    });

    await test.step('Verify Login Failure', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
});

test('Login Failure (Invalid Password)', async ({ page }) => { 
    const loginPage = new LoginPage(page);

    await test.step('Open Login Page', async () => {
        await loginPage.open();
    });

    await test.step('Perform Login', async () => {
        await loginPage.login('standard_user', 'wrong_password');
    });

    await test.step('Verify Login Failure', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
});

test('Login Failure (Empty Username)', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open Login Page', async () => {
        await loginPage.open();
    });
    
    await test.step('Perform Login', async () => {
        await loginPage.emailNull('secret_sauce');
    });
    
    await test.step('Verify Login Failure', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
    });
});

test('Login Failure (Empty Password)', async ({ page }) => {
    const loginPage = new LoginPage(page); 

    await test.step('Open Login Page', async () => {
        await loginPage.open();
    });
    
    await test.step('Perform Login', async () => {
        await loginPage.passwordNull('standard_user');
    });
    
    await test.step('Verify Login Failure', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');
    });
});