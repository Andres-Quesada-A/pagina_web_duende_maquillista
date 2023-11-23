import { NotificationCategory } from "./NotificationCategory";
import { User } from "./User";

export class Notification {
    private id: number;
    private title: string;
    private description: string;
    private timestamp: string;
    private category: NotificationCategory;
    private moreDetailsUrl?: string;
    private user: User;
    
    constructor(
        id: number,
        title: string,
        description: string,
        timestamp: string,
        category: NotificationCategory,
        user: User,
        moreDetailsUrl?: string,
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.timestamp = timestamp;
        this.category = category;
        this.moreDetailsUrl = moreDetailsUrl;
        this.user = user;
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

    getMoreDetailsUrl(): string | undefined {
        return this.moreDetailsUrl;
    }

    setMoreDetailsUrl(moreDetailsUrl: string) {
        this.moreDetailsUrl = moreDetailsUrl;
    }

    getUser(): User {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }
}