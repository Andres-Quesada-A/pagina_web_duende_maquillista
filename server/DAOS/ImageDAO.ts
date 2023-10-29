import { Image } from "../models/Image";
import { ImageCategory } from "../models/ImageCategory";
import { ImageSubcategory } from "../models/ImageSubcategory";
import ConnectionDAO from "./ConnectionDAO";
import sqlcon from 'mssql';
export class ImageDAO {

    // Method to get a list of image categories
    async getImageCategoryList(): Promise<any> {
        // Logic to retrieve a list of image categories and subcategories

        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];
        //const SQL = DaoConnection.getInstance().getPool();

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ImageCategory_List").then((result) => {
                    // Check if the query has some values
                    if (result && result.recordset) {
                        // Extract the records from the result and convert to an array of objects
                        const categories: [] = result.recordset.map((row: any) => {
                            // Split the subcategories string by the comma and create an array
                            var value;
                            if (row.subcategories == null) {
                                value = [];
                            }
                            else {
                                value = JSON.parse(row.subcategories).map((subcategory: any) => subcategory.subcategory.trim());
                            }
                            return {
                                category: row.category,
                                subcategory: value
                            };
                        });
                        resolve(categories);
                    } else {
                        // case when the query did not return any data
                        damage.push({ customError: String(result.customError) });
                        reject(damage);
                    }

                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(damage);
                });
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        });
    }

    // Method to create an image category
    async createImageCategory(category: string): Promise<any> {

        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ImageCategory_Add", { "IN_imageCategory": category }).then((result) => {
                    //query was successful
                    resolve(true);

                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(damage);
                });
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        });
    }

    // Method to edit an image category
    async editImageCategory(category: string, newCategory: string): Promise<any> {

        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ImageCategory_Edit", { "IN_newImageCategory": newCategory, "IN_imageCategory": category }).then((result) => {
                    //query was successful
                    resolve(true);

                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(damage);
                });
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        });
    }

    // Method to delete an image category
    async deleteImageCategory(category: string): Promise<any> {

        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ImageCategory_Delete", { "IN_imageCategory": category }).then((result) => {
                    //query was successful
                    resolve(true);

                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(damage);
                });
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        });
    }

    /////////////////////////////////////////////////////////////////////////////


    // Method to create an image category
    async createImageSubcategory(category: string, subcategory: string): Promise<any> {

        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ImageSubcategory_Add", { "IN_imageCategory": category, "IN_imageSubcategory": subcategory }).then((result) => {
                    //query was successful
                    resolve(true);

                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(damage);
                });
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        });
    }

    // Method to edit an image category
    async editImageSubcategory(category: string, subcategory: string, newSubcategory: string): Promise<any> {

        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ImageSubcategory_Edit", { "IN_imageCategory": category, "IN_imageSubcategory": subcategory, "IN_newImageSubcategory": newSubcategory }).then((result) => {
                    //query was successful
                    resolve(true);

                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(damage);
                });
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        });
    }

    // Method to delete an image category
    async deleteImageSubcategory(category: string, subcategory: string): Promise<any> {

        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ImageSubcategory_Delete", { "IN_imageCategory": category, "IN_imageSubcategory": subcategory }).then((result) => {
                    //query was successful
                    const good: { category: string, subcategory: string, delete: boolean }[] = [{ category, subcategory, delete: true }];
                    resolve(good);

                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(damage);
                });
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        });
    }

    // Method to create an image
    async createImage(
        imageCategory: string,
        imageSubcategory: string,
        name: string,
        description: string,
        tags: string[],
        imageUrl: string): Promise<Image | undefined> {
            
        const SQL = ConnectionDAO.getInstance();

        const damage: { customError: string | undefined }[] = [];

        // Define the schema of the TVP
        const tvpSchema = new sqlcon.Table('TagsTVP');
        tvpSchema.columns.add('tags', sqlcon.VarChar(32));

        // Add tags to the TVP
        tags.forEach(item => tvpSchema.rows.add(item));

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_Image_Add",
                    {
                        "IN_ImageCategory": imageCategory,
                        "IN_ImageSubcategory": imageSubcategory,
                        "IN_Name": name,
                        "IN_Description": description,
                        "IN_Tags": tvpSchema,
                        "IN_ImageUrl": imageUrl
                    })
                    .then((result) => {
                        //query was successful
                        const image: any = result?.recordset[0];
                        const tags = image.Tags ? JSON.parse(image.Tags).map((tag: any) => tag.description) : [];
                        console.log(result)
                        const imageObj = new Image(
                                image.ImageID,
                                image.Name,
                                image.Date,
                                image.Description,
                                image.Category,
                                image.Subcategory,
                                tags,
                                image.URL
                        );
                        resolve(imageObj);

                    }).catch((error) => {
                        //fail in the execution of the query
                        damage.push({ customError: error.customError });
                        reject(damage);
                    });
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        });
    }

    // Method to edit an image
    async editImage(
        id: number,
        imageCategory: string,
        imageSubcategory: string,
        name: string,
        description: string,
        tags: string[],
        imageUrl: string): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        // Define the schema of the TVP
        const tvpSchema = new sqlcon.Table('TagsTVP');
        tvpSchema.columns.add('tags', sqlcon.VarChar(32));

        // Add tags to the TVP
        tags.forEach(item => tvpSchema.rows.add(item));

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_Image_Edit",
                    {
                        "IN_ImageId": id,
                        "IN_ImageCategory": imageCategory,
                        "IN_ImageSubcategory": imageSubcategory,
                        "IN_Name": name,
                        "IN_Description": description,
                        "IN_Tags": tvpSchema,
                        "IN_ImageUrl": imageUrl
                    })
                    .then((result) => {
                        //query was successful
                        resolve(true);

                    }).catch((error) => {
                        //fail in the execution of the query
                        damage.push({ customError: error.customError });
                        reject(damage);
                    });
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        });
    }

    // Method to delete an image
    async deleteImage(id: number): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_Image_Delete",
                    {
                        "IN_ImageId": id
                    })
                    .then((result) => {
                        //query was successful
                        resolve(true);

                    }).catch((error) => {
                        //fail in the execution of the query
                        damage.push({ customError: error.customError });
                        reject(damage);
                    });
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        });
    }

    // Method to get an image
    async getImage(id: number): Promise<Image | undefined> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_Image_Details",
                    {
                        "IN_ImageId": id
                    })
                    .then((result) => {
                        //query was successful
                        const image: any = result?.recordset[0];
                        const tags = image.Tags ? JSON.parse(image.Tags).map((tag: any) => tag.description) : [];
                        const imageObj = new Image(
                            image.ImageID,
                            image.Name,
                            image.Date,
                            image.Description,
                            image.Category, // is wrong
                            image.Subcategory,
                            tags,
                            image.URL
                        );
                        resolve(imageObj);

                    }).catch((error) => {
                        //fail in the execution of the query
                        damage.push({ customError: error.customError });
                        reject(damage);
                    });
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        });
    }

    async getImageList(limit?: number): Promise<Image[]> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];
        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_Image_List", { "IN_limit": limit })
                    .then((result) => {
                        //query was successful
                        const images: Image[] = result?.recordset.map((row: any) => {
                            const tags = row.Tags ? JSON.parse(row.Tags).map((tag: any) => tag.description) : [];
                            return new Image(
                                row.ImageID,
                                row.Name,
                                row.Date,
                                row.Description,
                                row.Category, // is wrong
                                row.Subcategory,
                                tags,
                                row.URL
                            );
                        });
                        resolve(images);
                    }).catch((error) => {
                        //fail in the execution of the query
                        damage.push({ customError: error.customError });
                        reject(damage);
                    });
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        });
    }
}
