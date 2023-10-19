import { ProductCategory } from "./ProductCategory";

export class Product {
    private id: number;
    private name: string;
    private description: string;
    private category: ProductCategory;
    private imageUrl: string;
    private price: number;
    private weight: number;
    private available: boolean;

    constructor(
        id: number,
        name: string,
        description: string,
        category: ProductCategory,
        imageUrl: string,
        price: number,
        weight: number,
        available: boolean
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.imageUrl = imageUrl;
        this.price = price;
        this.weight = weight;
        this.available = available;
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

    getDescription(): string {
        return this.description;
    }

    setDescription(description: string) {
        this.description = description;
    }

    getCategory(): ProductCategory {
        return this.category;
    }

    setCategory(category: ProductCategory) {
        this.category = category;
    }

    getImageUrl(): string {
        return this.imageUrl;
    }

    setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number) {
        this.price = price;
    }

    getWeight(): number {
        return this.weight;
    }

    setWeight(weight: number) {
        this.weight = weight;
    }

    getAvailable(): boolean {
        return this.available;
    }
    
    setAvailable(available: boolean) {
        this.available = available;
    }
}