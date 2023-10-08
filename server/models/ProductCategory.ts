import {AbstractCategory} from './AbstractCategory';

export class ProductCategory extends AbstractCategory {
    constructor(description: string) {
        super(description);
    }

    getCategoryInfo(): string {
        return `Category: ${this.getDescription()}`;
    }
}