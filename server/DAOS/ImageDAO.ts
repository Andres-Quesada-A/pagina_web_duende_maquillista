import { Image } from "../models/Image";
import { ImageCategory } from "../models/ImageCategory";
import { ImageSubcategory } from "../models/ImageSubcategory";
import DaoConnection from "./DaoConnection";
import sqlcon from 'mssql';

export class ImageDAO {
    
    
    // Method to get a list of image categories
    async getImageCategoryList(): Promise<ImageCategory[]> {
        // Logic to retrieve a list of image categories

        const SQL = DaoConnection.getInstance();
        //const SQL = DaoConnection.getInstance().getPool();

        try {
            
            const result = await SQL.query("Duende_SP_ImageCategory_List");

            // Check if the query was successful
            if (result && result.recordset) {
                // Extract the records from the result and convert to an array of objects
                const records = result.recordset as ImageCategory[];
                return records;
            } else {
                // Handle the case when the query did not return any data
                //res.status(404).json({ error: "No records found" });
                return [];
            }
        } catch (error) {
            // Handle any errors that occur during the query
            //console.error("Error while fetching image categories:", error);
            //res.status(500).json({ error: "Internal Server Error" });
            return [];
        }
    }

    // Method to create an image category
    async createImageCategory(category: string): Promise<boolean> {

        const SQL = DaoConnection.getInstance();
        
        try {
            const result = await SQL.query("Duende_SP_ImageCategory_Add", {"IN_imageCategory" : category});

            //query was successful
            return true;

        } catch (error) {
            // Handle any errors that occur during the query
            //console.error("Error while fetching image categories:", error);
            //res.status(500).json({ error: "Internal Server Error" });
            return false;
        }
    }

    // Method to edit an image category
    async editImageCategory(category: string, newCategory: string): Promise<boolean> {
        
        const SQL = DaoConnection.getInstance();
        
        try {
            const result = await SQL.query("Duende_SP_ImageCategory_Edit", {"IN_newImageCategory" : newCategory, "IN_imageCategory" : category});

            //query was successful
            return true;

        } catch (error) {
            // Handle any errors that occur during the query
            //console.error("Error while fetching image categories:", error);
            //res.status(500).json({ error: "Internal Server Error" });
            return false;
        }
    }

    // Method to delete an image category
    async deleteImageCategory(category: string): Promise<boolean> {
        
        const SQL = DaoConnection.getInstance();
        
        try {
            const result = await SQL.query("Duende_SP_ImageCategory_Delete", {"IN_imageCategory" : category});

            //query was successful
            return true;

        } catch (error) {
            // Handle any errors that occur during the query
            //console.error("Error while fetching image categories:", error);
            //res.status(500).json({ error: "Internal Server Error" });
            return false;
        }
    }
    
    /////////////////////////////////////////////////////////////////////////////

    // Method to get a list of image categories
    async getImageSubcategoryList(category: string): Promise<[]> {
        // Logic to retrieve a list of image categories

        const SQL = DaoConnection.getInstance();
        
        try {
            const result = await SQL.query("Duende_SP_ImageSubcategory_List", {"IN_imageCategory" : category});
            // Check if the query was successful
            if (result && result.recordset) {
                // Extract the records from the result and convert to an array of objects
                const categories: [] = result.recordset.map((row: any) => {
                    return {
                        subcategory: row.subcategoria, // //row.nombrecolumna
                    };
                });
                console.log(categories)
                return categories;
            } else {
                console.log("no llegaron datos");
                // Handle the case when the query did not return any data
                //res.status(404).json({ error: "No records found" });
                return [];
            }
        } catch (error) {
            console.log("error encontrado");
            // Handle any errors that occur during the query
            //console.error("Error while fetching image categories:", error);
            //res.status(500).json({ error: "Internal Server Error" });
            return [];
        }
    }
    
    // Method to create an image category
    async createImageSubcategory(category: string, subcategory: string): Promise<boolean> {

        const SQL = DaoConnection.getInstance();
        
        try {
            const result = await SQL.query("Duende_SP_ImageSubcategory_Add", {"IN_imageCategory" : category, "IN_imageSubcategory" : subcategory});

            //query was successful
            return true;

        } catch (error) {
            // Handle any errors that occur during the query
            //console.error("Error while fetching image categories:", error);
            //res.status(500).json({ error: "Internal Server Error" });
            return false;
        }
    }

    // Method to edit an image category
    async editImageSubcategory(category: string, subcategory: string, newSubcategory: string): Promise<boolean> {
        
        const SQL = DaoConnection.getInstance();
        
        try {
            const result = await SQL.query("Duende_SP_ImageSubcategory_Edit", {"IN_imageCategory" : category, "IN_imageSubcategory" : subcategory, "IN_newImageSubcategory": newSubcategory});

            //query was successful
            return true;

        } catch (error) {
            // Handle any errors that occur during the query
            //console.error("Error while fetching image categories:", error);
            //res.status(500).json({ error: "Internal Server Error" });
            return false;
        }
    }

    // Method to delete an image category
    async deleteImageSubcategory(category: string, subcategory: string): Promise<boolean> {
        
        const SQL = DaoConnection.getInstance();
        
        try {
            const result = await SQL.query("Duende_SP_ImageSubcategory_Delete", {"IN_imageCategory" : category, "IN_imageSubcategory" : subcategory});

            //query was successful
            return true;

        } catch (error) {
            // Handle any errors that occur during the query
            //console.error("Error while fetching image categories:", error);
            //res.status(500).json({ error: "Internal Server Error" });
            return false;
        }
    }
    
}
