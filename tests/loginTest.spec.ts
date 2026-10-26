import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.spec.ts';


test('Login Success', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login('standard_user', 'secret_sauce');

    await expect(loginPage.pageTitle).toHaveText('Products');   
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');   
    await expect(loginPage.pageTitle).toBeVisible();    
});

test('Login Failure (Invalid Username)', async ({ page }) => { 
    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login('standard', 'secret_sauce');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

test('Login Failure (Invalid Password)', async ({ page }) => { 
    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});