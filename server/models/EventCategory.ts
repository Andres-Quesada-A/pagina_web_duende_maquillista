import {AbstractCategory} from './AbstractCategory';

export class EventCategory extends AbstractCategory {
    constructor(description: string) {
        super(description);
    }

    getCategoryInfo(): string {
        return `Category: ${this.getDescription()}`;
    }
}