import type {Page, Locator} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly addCartButton: Locator;
    readonly cartLinkIcon: Locator;
    readonly cartBadgeIcon: Locator;
    readonly inventoryItem: Locator;



    constructor(page: Page) {
        this.page = page;

        this.addCartButton = page.locator('[data-test="add-to-cart"]');
        this.cartLinkIcon = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadgeIcon = page.locator('[data-test="shopping-cart-badge"]');
        this.inventoryItem = page.locator('[data-test="inventory-item-name"]');
    }

    async addProductToCart(
        productName: string
    ): Promise<void> {
        await this.inventoryItem
        .filter({ hasText: productName }).click();

        await this.addCartButton
            .filter({ hasText: 'Add to Cart' }).click();
    }

    async goToCart(): Promise<void> {
        await this.cartLinkIcon.click();
    }
}