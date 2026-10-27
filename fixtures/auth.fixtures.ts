import {test as base, expect} from '@playwright/test';
import {Page} from '@playwright/test';


import {LoginPage} from '../pages/loginPage.spec';
import {loginUsers} from '../test-data/user';

type  AuthFixtures = {
    authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
    authenticatedPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        const user = loginUsers.standardUser;

        await loginPage.open();
        await loginPage.login(user.username, user.password);

        await use(page);
    }
    
});

export {expect};