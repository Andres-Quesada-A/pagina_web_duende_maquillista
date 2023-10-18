import {AbstractCategory} from './AbstractCategory';

export class ImageSubcategory extends AbstractCategory {
    constructor(description: string) {
        super(description);
    }

    getCategoryInfo(): string {
        return `Subcategory: ${this.getDescription()}`;
    }
}