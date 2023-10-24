import ConnectionDAO from "./ConnectionDAO";
import { Product } from "../models/Product";
import { ProductCategory } from "../models/ProductCategory";

export class ProductDAO {
    async getProductList(): Promise<Product[]> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_Product_List", {})
                    .then((result) => {
                        const productList = result?.recordset.map(
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
                        resolve(productList);
                    })
                    .catch((error) => {
                        damage.push({
                            customError: error.customError,
                        });
                        reject(damage);
                    });
            } catch (error) {
                reject(damage);
            }
        });
    }

    async getProduct(productId: number): Promise<Product | undefined> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_Product_Details", { IN_id: productId })
                    .then((result) => {
                        const product: any = result?.recordset[0];
                        const productObj = new Product(
                            product.id,
                            product.name,
                            product.description,
                            new ProductCategory(product.category),
                            product.imageUrl,
                            product.price,
                            product.weight,
                            product.available
                        );
                        resolve(productObj);
                    })
                    .catch((error) => {
                        damage.push({
                            customError: error.customError,
                        });
                        reject(damage);
                    });
            } catch (error) {
                reject(damage);
            }
        });
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
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                const params = {
                    IN_name: name,
                    IN_description: description,
                    IN_category: category,
                    IN_imageUrl: imageUrl,
                    IN_price: price,
                    IN_weight: weight,
                    IN_available: available,
                };
                SQL.query("Duende_SP_Product_Add", params)
                    .then((result) => {
                        const product: any = result?.recordset[0];
                        const productObj = new Product(
                            product.id,
                            product.name,
                            product.description,
                            new ProductCategory(product.category),
                            product.imageUrl,
                            product.price,
                            product.weight,
                            product.available
                        );
                        resolve(productObj);
                    })
                    .catch((error) => {
                        damage.push({
                            customError: error.customError,
                        });
                        reject(damage);
                    });
            } catch (error) {
                reject(damage);
            }
        });
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
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                const params = {
                    IN_id: id,
                    IN_category: category,
                    IN_name: name,
                    IN_description: description,
                    IN_imageUrl: imageUrl,
                    IN_price: price,
                    IN_weight: weight,
                    IN_available: available,
                };
                SQL.query("Duende_SP_Product_Edit", params)
                    .then((result) => {
                        resolve(true);
                    })
                    .catch((error) => {
                        damage.push({
                            customError: error.customError,
                        });
                        reject(damage);
                    });
            } catch (error) {
                reject(damage);
            }
        });
    }

    async deleteProduct(productId: number): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_Product_Delete", { IN_id: productId })
                    .then((result) => {
                        resolve(true);
                    })
                    .catch((error) => {
                        damage.push({
                            customError: error.customError,
                        });
                        reject(damage);
                    });
            } catch (error) {
                reject(damage);
            }
        });
    }

    async getProductCategoryList(): Promise<ProductCategory[]> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ProductCategory_List", {})
                    .then((result) => {
                        const productCategoryList = result?.recordset.map(
                            (productCategory: any) =>
                                new ProductCategory(productCategory.description)
                        );
                        resolve(productCategoryList);
                    })
                    .catch((error) => {
                        damage.push({
                            customError: error.customError,
                        });
                        reject(damage);
                    });
            } catch (error) {
                reject(damage);
            }
        });
    }

    async createProductCategory(
        description: string
    ): Promise<ProductCategory | undefined> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        console.log("Dao", description)

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ProductCategory_Add", {
                    IN_description: description,
                })
                    .then((result) => {
                        console.log(result, "Result")
                        const productCategory: any = result?.recordset[0];
                        console.log("here", productCategory)
                        const productCategoryObj = new ProductCategory(
                            productCategory.description
                        );
                        console.log(productCategoryObj)
                        resolve(productCategoryObj);
                    })
                    .catch((error) => {
                        console.error(error)
                        damage.push({
                            customError: error.customError,
                        });
                        reject(damage);
                    });
            } catch (error) {
                console.error(error)
                reject(damage);
            }
        });
    }

    async editProductCategory(
        description: string,
        newDescription: string
    ): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ProductCategory_Edit", {
                    IN_description: description,
                    IN_newDescription: newDescription,
                })
                    .then((result) => {
                        resolve(true);
                    })
                    .catch((error) => {
                        damage.push({
                            customError: error.customError,
                        });
                        reject(damage);
                    });
            } catch (error) {
                reject(damage);
            }
        });
    }

    async deleteProductCategory(description: string): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ProductCategory_Delete", {
                    IN_description: description,
                })
                    .then((result) => {
                        resolve(true);
                    })
                    .catch((error) => {
                        damage.push({
                            customError: error.customError,
                        });
                        reject(damage);
                    });
            } catch (error) {
                reject(damage);
            }
        });
    }
}
