import {Page, Locator} from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItem: Locator;
    readonly nameItem: Locator;
    readonly indexItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItem = page.locator('[data-test="inventory-item"]');
        this.nameItem = page.locator('[data-test="inventory-item-name"]');
        this.indexItem = page.locator('[data-test="item-quantity"]');
    }

    async checkCartItem(productName: string): Promise<void> {
         await this.cartItem;
        
        await this.nameItem
            .filter({ hasText: productName });
    }

}
