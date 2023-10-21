import { Image } from "../models/Image";
import { ImageCategory } from "../models/ImageCategory";
import { ImageSubcategory } from "../models/ImageSubcategory";
import ConnectionDAO from "./ConnectionDAO";
import sqlcon from 'mssql';

export class ImageDAO {
    
    // Method to get a list of image categories
    async getwImageCategoryList(): Promise<any> {
        // Logic to retrieve a list of image categories and subcategories

        const SQL = ConnectionDAO.getInstance();
        const damage: { error: boolean, message: string}[] = [];
        //const SQL = DaoConnection.getInstance().getPool();


        try {
            
            const result = await SQL.query("Duende_SP_ImageCategory_List");
            

            // Check if the query has some values
            if (result && result.recordset) {
                // Extract the records from the result and convert to an array of objects
                const categories: [] = result.recordset.map((row: any) => {
                    // Split the subcategories string by the comma and create an array

                    var value;

                    if(row.subcategories === ""){
                        value = null;
                    } 
                    else {
                        value = row.subcategories.split(',').map((subcategory: string) => subcategory.trim());
                    }
                    return {
                        category: row.category,
                        subcategory: value
                    };
                    
                });
                return categories;
            } else {
                //console.log("no llegaron datos");
                // case when the query did not return any data
                const damage: { error: boolean, message: string}[] = [{error: true, message: String(result.message)}];
                return damage;
            }
        } catch (error) {
            //console.log("error encontrado");
            // any errors that occur during the query
            
            return damage;
        }
    }

    // Method to get a list of image categories
    async getImageCategoryList(): Promise<any> {
        // Logic to retrieve a list of image categories and subcategories

        const SQL = ConnectionDAO.getInstance();
        const damage: { error: boolean, message: string}[] = [];
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
                            if(row.subcategories === ""){
                                value = null;
                            } 
                            else {
                                value = row.subcategories.split(',').map((subcategory: string) => subcategory.trim());
                            }
                            return {
                                category: row.category,
                                subcategory: value
                            };
                        });
                        resolve(categories);
                    } else {
                        // case when the query did not return any data
                        const damage: { error: boolean, message: string}[] = [{error: true, message: String(result.message)}];
                        reject(damage);
                    }

                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({error: true, message: String(error.message)});
                    reject(damage);
                });
            } catch (error) {
                // any errors that occur during the process
                damage.push({error: true, message: "surgio un problema"})
                reject(damage)
            }
        }); 
    }

    // Method to create an image category
    async createImageCategory(category: string): Promise<any> {

        const SQL = ConnectionDAO.getInstance();
        const damage: { error: boolean, message: string}[] = [];
        const ccate = category;
        
        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ImageCategory_Add", {"IN_imageCategory" : category}).then((result) => {
                    //query was successful
                    const good: {category: string}[] = [{category: ccate}];
                    resolve(good);

                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({error: true, message: String(error.message)});
                    reject(damage);
                });
            } catch (error) {
                // any errors that occur during the process
                damage.push({error: true, message: "surgio un problema"})
                reject(damage)
            }
        }); 
    }

    // Method to edit an image category
    async editImageCategory(category: string, newCategory: string): Promise<any> {
        
        const SQL = ConnectionDAO.getInstance();
        const damage: { error: boolean, message: string}[] = [];
        const ccate = category;
        const newccate = newCategory;
        
        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_ImageCategory_Edit", {"IN_newImageCategory" : newCategory, "IN_imageCategory" : category}).then((result) => {
                    //query was successful
                    const good: { category: string, newCategory: string }[] = [{category: ccate, newCategory: newccate}];
                    resolve(good);

                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({error: true, message: String(error.message)});
                    reject(damage);
                });
            } catch (error) {
                // any errors that occur during the process
                damage.push({error: true, message: "surgio un problema"})
                reject(damage)
            }
        }); 
    }

    // Method to delete an image category
    async deleteImageCategory(category: string): Promise<any> {
        
        const SQL = ConnectionDAO.getInstance();
        const damage: { error: boolean, message: string}[] = [];
        const ccate = category;
        
        try {
            const result = await SQL.query("Duende_SP_ImageCategory_Delete", {"IN_imageCategory" : category});

            if (result.message) {
                //error in the query
                const damage: { error: boolean, message: string}[] = [{error: true, message: String(result.message)}];
                return damage;
            }

            //query was successful
            const good: { category: string, delete: boolean }[] = [{category: ccate, delete: true}];
            return good;

        } catch (error) {
            // any errors that occur during the query
            
            return damage;
        }
    }
    
    /////////////////////////////////////////////////////////////////////////////

    
    // Method to create an image category
    async createImageSubcategory(category: string, subcategory: string): Promise<any> {

        const SQL = ConnectionDAO.getInstance();
        const damage: { error: boolean, message: string}[] = [];
        const ccate = category;
        const subccate = subcategory;
        
        try {
            const result = await SQL.query("Duende_SP_ImageSubcategory_Add", {"IN_imageCategory" : category, "IN_imageSubcategory" : subcategory});

            if (result.message) {
                //error in the query
                const damage: { error: boolean, message: string}[] = [{error: true, message: String(result.message)}];
                return damage;
            }

            //query was successful
            const good: { category: string, subcategory: string  }[] = [{category: ccate, subcategory: subccate}];
            return good;

        } catch (error) {
            console.log("error encontrado");
            // any errors that occur during the query
            
            return damage;
        }
    }

    // Method to edit an image category
    async editImageSubcategory(category: string, subcategory: string, newSubcategory: string): Promise<any> {
        
        const SQL = ConnectionDAO.getInstance();
        const damage: { error: boolean, message: string}[] = [];
        const ccate = category;
        const subccate = subcategory;
        const newsubccate = newSubcategory;
        
        try {
            const result = await SQL.query("Duende_SP_ImageSubcategory_Edit", {"IN_imageCategory" : category, "IN_imageSubcategory" : subcategory, "IN_newImageSubcategory": newSubcategory});

            if (result.message) {
                //error in the query
                const damage: { error: boolean, message: string}[] = [{error: true, message: String(result.message)}];
                return damage;
            }

            //query was successful
            const good: { category: string, subcategory: string, newsubcategory: string}[] = [{category: ccate, subcategory: subccate, newsubcategory: newsubccate}];
            return good;

        } catch (error) {
            console.log("error encontrado");
            // any errors that occur during the query
            
            return damage;
        }
    }

    // Method to delete an image category
    async deleteImageSubcategory(category: string, subcategory: string): Promise<any> {
        
        const SQL = ConnectionDAO.getInstance();
        const damage: { error: boolean, message: string}[] = [];
        const ccate = category;
        const subccate = subcategory;
        
        try {
            const result = await SQL.query("Duende_SP_ImageSubcategory_Delete", {"IN_imageCategory" : category, "IN_imageSubcategory" : subcategory});

            if (result.message) {
                //error in the query
                const damage: { error: boolean, message: string}[] = [{error: true, message: String(result.message)}];
                return damage;
            }

            //query was successful
            const good: { category: string, subcategory: string, delete: boolean }[] = [{category: ccate, subcategory: ccate, delete: true}];
            return good;

        } catch (error) {
            // any errors that occur during the query
            
            return damage;
        }
    }
    
}
