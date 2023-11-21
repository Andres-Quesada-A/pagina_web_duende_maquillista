import { ProductDAO } from "../DAOS/ProductDAO";
import { Product } from "../models/Product";
import { ProductCategory } from "../models/ProductCategory";

export class ProductController {
    private ProductDAO: ProductDAO;
    constructor() {
        this.ProductDAO = new ProductDAO();
    }

    async getProductList(limit?: number): Promise<Product[]> {
        const response = await this.ProductDAO.getProductList(limit);
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

    async getProductCategoryList(): Promise<ProductCategory[]> {
        const response = await this.ProductDAO.getProductCategoryList();
        return response;
    }

    async createProductCategory(
        description: string
    ): Promise<ProductCategory | undefined> {
        const response = await this.ProductDAO.createProductCategory(
            description
        );
        console.log("response createProductCategory", response)
        return response;
    }

    async editProductCategory(
        description: string,
        newDescription: string
    ): Promise<boolean> {
        const response = await this.ProductDAO.editProductCategory(
            description,
            newDescription
        );
        return response;
    }

    async deleteProductCategory(description: string): Promise<boolean> {
        const response = await this.ProductDAO.deleteProductCategory(
            description
        );
        return response;
    }
}
