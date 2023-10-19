import { ProductDAO } from "../DAOS/ProductDAO";
import { Product } from "../models/Product";

export class ProductController {
    private ProductDAO: ProductDAO;
    constructor() {
        this.ProductDAO = new ProductDAO();
    }

    getProductList(category: string): Product[] {
        return this.ProductDAO.getProductList(category);
    }

    getProduct(id: number): Product | undefined {
        return this.ProductDAO.getProduct(id);
    }

    createProduct(
        name: string,
        description: string,
        category: string,
        imageUrl: string,
        price: number,
        weight: number,
        available: boolean
    ): Product | undefined {
        return this.ProductDAO.createProduct(
            name,
            description,
            category,
            imageUrl,
            price,
            weight,
            available
        );
    }

    editProduct(
        id: number,
        name: string,
        description: string,
        category: string,
        imageUrl: string,
        price: number,
        weight: number,
        available: boolean
    ): boolean {
        return this.ProductDAO.editProduct(
            id,
            name,
            description,
            category,
            imageUrl,
            price,
            weight,
            available
        );
    }

    deleteProduct(id: number): boolean {
        return this.ProductDAO.deleteProduct(id);
    }
}
