import ConnectionDAO from "./ConnectionDAO";
import { Product } from "../models/Product";
import { ProductCategory } from "../models/ProductCategory";
import sqlcon from "mssql";

export class ProductDAO {
    private ConnectionDAO: ConnectionDAO;

    constructor() {
        this.ConnectionDAO = ConnectionDAO.getInstance();
    }

    getProductList(category: string): Product[] {
        const pool = this.ConnectionDAO.getPool();
        const request = pool.request();

        try {
            request.input("@IN_category", sqlcon.VarChar, category);
        } catch (error) {
            console.log(error);
            return [];
        }

        request.execute("Duende_SP_Product_List", (error, result) => {
            if (error) {
                console.log("Error en la consulta");
                return [];
            }
            return result?.recordset.map(
                (product: any) =>
                    new Product(
                        product.id,
                        product.name,
                        product.description,
                        new ProductCategory(product.category),
                        product.imageUrl,
                        product.price,
                        product.weight,
                        product.available
                    )
            );
        });

        return [];
    }

    getProduct(productId: number): Product | undefined {
        const pool = this.ConnectionDAO.getPool();
        const request = pool.request();

        try {
            request.input("@IN_id", sqlcon.Int, productId);
        } catch (error) {
            console.log(error);
            return undefined;
        }

        request.execute("Duende_SP_Product_Details", (error, result) => {
            if (error) {
                console.log("Error en la consulta");
                return undefined;
            }
            const product: any = result?.recordset[0];
            return new Product(
                product.id,
                product.name,
                product.description,
                new ProductCategory(product.category),
                product.imageUrl,
                product.price,
                product.weight,
                product.available
            );
        });

        return undefined;
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
        const pool = this.ConnectionDAO.getPool();
        const request = pool.request();

        try {
            request.input("@IN_category", sqlcon.VarChar, category);
            request.input("@IN_name", sqlcon.VarChar, name);
            request.input("@IN_description", sqlcon.VarChar, description);
            request.input("@IN_imageUrl", sqlcon.VarChar, imageUrl);
            request.input("@IN_price", sqlcon.Int, price);
            request.input("@IN_weight", sqlcon.Int, weight);
            request.input("@IN_available", sqlcon.Bit, available);
        } catch (error) {
            console.log(error);
            return undefined;
        }

        request.execute("Duende_SP_Product_Add", (error, result) => {
            if (error) {
                console.log("Error en la consulta");
                return undefined;
            }
            const product: any = result?.recordset[0];
            return new Product(
                product.id,
                product.name,
                product.description,
                new ProductCategory(product.category),
                product.imageUrl,
                product.price,
                product.weight,
                product.available
            );
        });

        return undefined;
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
        const pool = this.ConnectionDAO.getPool();
        const request = pool.request();

        try {
            request.input("@IN_id", sqlcon.Int, id);
            request.input("@IN_category", sqlcon.VarChar, category);
            request.input("@IN_name", sqlcon.VarChar, name);
            request.input("@IN_description", sqlcon.VarChar, description);
            request.input("@IN_imageUrl", sqlcon.VarChar, imageUrl);
            request.input("@IN_price", sqlcon.Int, price);
            request.input("@IN_weight", sqlcon.Int, weight);
            request.input("@IN_available", sqlcon.Bit, available);
        } catch (error) {
            console.log(error);
            return false;
        }

        request.execute("Duende_SP_Product_Edit", (error, result) => {
            if (error) {
                console.log("Error en la consulta");
                return false;
            }
            return true;
        });

        return true;
    }

    deleteProduct(productId: number): boolean {
        const pool = this.ConnectionDAO.getPool();
        const request = pool.request();

        try {
            request.input("@IN_id", sqlcon.Int, productId);
        } catch (error) {
            console.log(error);
            return false;
        }

        request.execute("Duende_SP_Product_Delete", (error, result) => {
            if (error) {
                console.log("Error en la consulta");
                return false;
            }
            return true;
        });

        return true;
    }
}
