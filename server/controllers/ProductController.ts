import { ProductDAO } from "../DAOS/ProductDAO";
import { Product } from "../models/Product";

export class ProductController {
    private ProductDAO: ProductDAO;
    constructor() {
        this.ProductDAO = new ProductDAO();
    }

    async getProductList(): Promise<Product[]> {
        const response = await this.ProductDAO.getProductList();
        return response;
    }

    async getProduct(id: number): Promise<Product | undefined> {
        const response = await this.ProductDAO.getProduct(id);
        return response;
    }

    async createProduct(
        name: string,
        description: string,
        category: string,
        imageUrl: string,
        price: number,
        weight: number,
        available: boolean
    ): Promise<Product | undefined> {
        const response = await this.ProductDAO.createProduct(
            name,
            description,
            category,
            imageUrl,
            price,
            weight,
            available
        );
        return response;
    }

    async editProduct(
        id: number,
        name: string,
        description: string,
        category: string,
        imageUrl: string,
        price: number,
        weight: number,
        available: boolean
    ): Promise<boolean> {
        const response = await this.ProductDAO.editProduct(
            id,
            name,
            description,
            category,
            imageUrl,
            price,
            weight,
            available
        );
        return response;
    }

    async deleteProduct(id: number): Promise<boolean> {
        const response = await this.ProductDAO.deleteProduct(id);
        return response;
    }
}
