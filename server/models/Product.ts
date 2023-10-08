import { ProductCategory } from "./ProductCategory";

export class Product {
    private id: number;
    private name: string;
    private description: string;
    private category: ProductCategory;
    private price: number;
    private imageUrl: string;
    private weight: number;

    constructor(
        id: number,
        name: string,
        description: string,
        category: ProductCategory,
        price: number,
        imageUrl: string,
        weight: number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.imageUrl = imageUrl;
        this.weight = weight;
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

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number) {
        this.price = price;
    }

    getImageUrl(): string {
        return this.imageUrl;
    }

    setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl;
    }

    getWeight(): number {
        return this.weight;
    }

    setWeight(weight: number) {
        this.weight = weight;
    }
}