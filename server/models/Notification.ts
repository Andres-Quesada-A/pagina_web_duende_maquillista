import { NotificationCategory } from "./NotificationCategory";

export class Notification {
    private id: number;
    private title: string;
    private description: string;
    private timestamp: string;
    private category: NotificationCategory;
    private moreDetailsUrl?: string;
    
    constructor(
        id: number,
        title: string,
        description: string,
        timestamp: string,
        category: NotificationCategory,
        moreDetailsUrl?: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.timestamp = timestamp;
        this.category = category;
        this.moreDetailsUrl = moreDetailsUrl;
    }
    
    getId(): number {
        return this.id;
    }
    
    setId(id: number) {
        this.id = id;
    }
    
    getTitle(): string {
        return this.title;
    }
    
    setTitle(title: string) {
        this.title = title;
    }
    
    getDescription(): string {
        return this.description;
    }
    
    setDescription(description: string) {
        this.description = description;
    }
    
    getTimestamp(): string {
        return this.timestamp;
    }
    
    setTimestamp(timestamp: string) {
        this.timestamp = timestamp;
    }
    
    getCategory(): NotificationCategory {
        return this.category;
    }
    
    setCategory(category: NotificationCategory) {
        this.category = category;
    }
}