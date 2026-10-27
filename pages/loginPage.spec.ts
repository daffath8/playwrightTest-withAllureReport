import type {Page, Locator} from '@playwright/test';
 export class LoginPage {
      private readonly page: Page;
     private readonly usernameInput: Locator;
     private readonly passwordInput: Locator;
     private readonly loginButton: Locator;
     readonly pageTitle: Locator;
     readonly errorMessage: Locator;

        constructor(page: Page) {  
            this.page = page;


            //Locator
            this.usernameInput = page.getByPlaceholder('Username');
            this.passwordInput = page.getByPlaceholder('Password');
            this.loginButton = page.getByRole('button', { name: 'Login' });
            this.pageTitle = page.locator('.title');
            this.errorMessage = page.locator('[data-test="error"]');
        }   

        async open(): Promise<void> {
            await this.page.goto('/');
        }

        async login
        (username: string, password: string): Promise<void> {
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        }   

    }