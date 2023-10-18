import { AbstractCategory } from './AbstractCategory';
import { ImageSubcategory } from './ImageSubcategory';

export class ImageCategory extends AbstractCategory {
    private subcategories: ImageSubcategory[];

    constructor(description: string, subcategories: ImageSubcategory[]) {
        super(description);
        this.subcategories = subcategories;
    }

    getSubcategories(): ImageSubcategory[] {
        return this.subcategories;
    }

    addSubcategory(subcategory: ImageSubcategory): void {
        this.subcategories.push(subcategory);
    }

    removeSubcategory(subcategory: ImageSubcategory): void {
        const index = this.subcategories.indexOf(subcategory);
        if (index !== -1) {
            this.subcategories.splice(index, 1);
        }
    }

    getCategoryInfo(): string {
        const subcategoryNames = this.subcategories.map((subcategory) => subcategory.getDescription());
        return `Category: ${this.getDescription()}, Subcategories: ${subcategoryNames.join(', ')}`;
    }
}