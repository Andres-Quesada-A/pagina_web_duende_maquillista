import { AbstractCategory } from './AbstractCategory';
import { ImageCategory } from './ImageCategory';

export class ImageSubcategory extends AbstractCategory {
    private subcategories: ImageCategory[];

    constructor(description: string, subcategories: ImageCategory[]) {
        super(description);
        this.subcategories = subcategories;
    }

    getSubcategories(): ImageCategory[] {
        return this.subcategories;
    }

    addSubcategory(subcategory: ImageCategory): void {
        this.subcategories.push(subcategory);
    }

    removeSubcategory(subcategory: ImageCategory): void {
        const index = this.subcategories.indexOf(subcategory);
        if (index !== -1) {
            this.subcategories.splice(index, 1);
        }
    }

    getCategoryInfo(): string {
        const subcategoryNames = this.subcategories.map((subcategory) => subcategory.getDescription());
        return `Subcategory: ${this.getDescription()}, Subcategories: ${subcategoryNames.join(', ')}`;
    }
}