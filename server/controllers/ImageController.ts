import { ImageDAO } from "../DAOS/ImageDAO";
import { Image } from "../models/Image";
import { ImageCategory } from "../models/ImageCategory";
import { ImageSubcategory } from "../models/ImageSubcategory";

export class ImageController {
    constructor() {

    }

    // Method to get a lis of images with an specific subcategory
    getImageList(category: string, subcategory: string): Image[] {
        // Logic to get the list of images
        return []
    }

    // Method to create a image, needs the info and subcategory
    createImage(imageCategory: string, imageSubcategory: string, name: string, description: string, date: Date, tags: string, imageUrl: string): boolean {
        // Logic to create the image
        // Returns true if the image is created, false if something was not provided
        return true;
    }

    // Method to edit an Image
    editImage(imageCategory: string, imageSubcategory: string, name: string, description: string, date: string, tags: string, imageUrl: string): boolean{
        // Logic to edit the image
        // Returns true if the image is edited, false if something was not provided
        return true
    }

    // Method to delete a Image
    deleteImage(id: number): boolean{
        // Logic to delete the image
        // Returns true if the image is deleted, false if the image can't be deleted
        return true
    }

    // Method to get a list of ImageCategory and ImageSubcategory
    getImageCategoryList(): Promise<any> {
        const dao = new ImageDAO
        return dao.getImageCategoryList()
    }

     // Method to create a ImageCategory
    createImageCategory(category: string): Promise<any> {
        const dao = new ImageDAO
        return dao.createImageCategory(category)
    }

    // Method to edit a ImageCategory
    editImageCategory(category: string, newCategory: string): Promise<any> {
        const dao = new ImageDAO
        return dao.editImageCategory(category, newCategory)
    }

    // Method to delete a ImageCategory
    deleteImageCategory(category: string): Promise<any> {
        const dao = new ImageDAO
        return dao.deleteImageCategory(category)
    }

    // Method to create a ImageSubcategory
    createImageSubcategory(category: string, subcategory: string): Promise<any> {
        const dao = new ImageDAO
        return dao.createImageSubcategory(category,subcategory)
    }

    // Method to edit a ImageSubcategory
    editImageSubcategory(category: string, subcategory: string, newSubcategory: string): Promise<any> {
        const dao = new ImageDAO
        return dao.editImageSubcategory(category, subcategory, newSubcategory)
    }

     // Method to delete a ImageSubcategory
    deleteImageSubcategory(category: string, subcategory: string): Promise<any> {
        const dao = new ImageDAO
        return dao.deleteImageSubcategory(category, subcategory)
    }

}