import { ImageSubcategory } from "./ImageSubcategory";
import { ImageCategory } from "./ImageCategory";

export class Image {
    private id: number;
    private name: string;
    private date: Date;
    private description: string;
    private category: ImageCategory;
    private subcategory: ImageSubcategory;
    private tags: string;
    private imageUrl: string;

    constructor(
        id: number,
        name: string,
        date: Date,
        description: string,
        category: ImageCategory,
        subcategory: ImageSubcategory,
        tags: string,
        imageUrl: string
    ) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.description = description;
        this.category = category;
        this.subcategory = subcategory;
        var str: string = tags
        str = "#" + str;
        str = str.replace(/ /g," #");
        this.tags = str
        //this.tags = tags
        this.imageUrl = imageUrl;
    }

    getId(): number {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string) {
        this.name = name;
    }

    getDate(): Date {
        return this.date;
    }

    setDate(date: Date) {
        this.date = date;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(description: string) {
        this.description = description;
    }

    getSubcategory(): ImageSubcategory {
        return this.subcategory;
    }

    setSubcategory(subcategory: ImageSubcategory) {
        this.subcategory = subcategory;
    }

    getTags(): string {
        return this.tags;
    }

    setTags(tags: string) {
        this.tags = tags;
    }

    getImageUrl(): string {
        return this.imageUrl;
    }

    setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl;
    }
}