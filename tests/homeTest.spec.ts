import {test, expect} from '../fixtures/auth.fixtures';

import {HomePage} from '../pages/homePage.spec';
import {CartPage} from '../pages/cartPage.spec';


test('Successfully add product to cart', async ({authenticatedPage}) => {
    const homePage = new HomePage(authenticatedPage);
    const cartPage = new CartPage(authenticatedPage);

    const productName = 'Sauce Labs Backpack';

    await test.step('Add Product to Cart', async () => {
        await homePage.addProductToCart(productName);
    });

    await test.step('Verify Product in Cart', async () => {
        await homePage.goToCart();

        await expect(cartPage.cartItem).toBeVisible();

        await expect(cartPage.nameItem).toBeVisible();

        await expect(cartPage.indexItem).toBeVisible();
        


    });
});
