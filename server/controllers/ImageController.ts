import { ImageDAO } from "../DAOS/ImageDAO";
import { Image } from "../models/Image";
import { ImageCategory } from "../models/ImageCategory";
import { ImageSubcategory } from "../models/ImageSubcategory";
import { UserController } from "./UserController";
import { EmailController } from "./EmailController";

export class ImageController {
    private ImageDAO: ImageDAO
    constructor() {
        this.ImageDAO = new ImageDAO();
    }

    // Method to get a lis of images with an specific subcategory
    async getImageList(): Promise<Image[]> {
        const response = await this.ImageDAO.getImageList();
        return response;
    }

    // Method to create a image, needs the info and subcategory
    async createImage(
        imageCategory: string, 
        imageSubcategory: string, 
        name: string, 
        description: string, 
        tags: string[], 
        imageUrl: string): Promise<Image | undefined> {

        const response = await this.ImageDAO.createImage(
            imageCategory, 
            imageSubcategory, 
            name, 
            description, 
            tags, 
            imageUrl);
        return response;

    }

    // Method to edit an Image
    async editImage(
        id: number,
        imageCategory: string, 
        imageSubcategory: string, 
        name: string, 
        description: string,
        tags: string[], 
        imageUrl: string) : Promise<boolean>{
        const response = await this.ImageDAO.editImage(
            id,
            imageCategory, 
            imageSubcategory, 
            name, 
            description,
            tags, 
            imageUrl)
        return response
    }

    // Method to delete a Image
    async deleteImage(id: number): Promise<boolean>{
        const response = await this.ImageDAO.deleteImage(id)
        return response
    }

    // Method to get a Image
    async getImage(id: number): Promise<Image | undefined> {
        const response = await this.ImageDAO.getImage(id);
        return response;
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

    async requestService(email: string, imageId: number, message: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const UserControllerObject = new UserController();
            const user = await UserControllerObject.getUser(email);
            const image = await this.getImage(imageId);

            if (!user || !image) {
                reject([{ customError: "La información proporcionada no es válida." }]);
            } else {
                const EmailControllerObject = new EmailController();

                EmailControllerObject.sendEmail(
                    ["duendemaquillista@gmail.com"],
                    "Solicitud de servicio",
                    "<p>Se recibió la solicitud de un servicio. Este es el detalle:</p>",
                    `https://duendemaquillista.azurewebsites.net/gallery/${image?.getId()}`,
                    image?.getImageUrl(),
                    message,
                    user,
                );

                resolve(true);
            }
        });
    }

}