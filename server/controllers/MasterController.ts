import { Request, Response } from "express";
import { Image } from "../models/Image";
import { ImageCategory } from "../models/ImageCategory";
import { ImageSubcategory } from "../models/ImageSubcategory";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { ProductCategory } from "../models/ProductCategory";
import { ShoppingCart } from "../models/ShoppingCart";
import { User } from "../models/User";
import { UserController } from "./UserController";
import { ImageController } from "./ImageController";
import { ProductController } from "./ProductController";
import { OrderController } from "./OrderController";
import ConnectionDAO from "../DAOS/ConnectionDAO";
import { EmailController } from "./EmailController";

export class MasterController {
    constructor() {
        ConnectionDAO.getInstance()
    }

    // Method to send a confirmation code via email
    sendCode(email: string): void {
        // Logic to send the confirmation code to the email
    }

    // Method to confirm a received code
    confirmCode(code: string): boolean {
        // Logic to confirm the code
        // Returns true if the code is valid, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to change a user's password
    newPassword(password: string, confirmPassword: string): boolean {
        // Logic to change the user's password
        // Returns true if the password change is successful, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to edit user information
    editUser(req: Request, res: Response): boolean {
        // password: string, idUser: number
        // Logic to edit user information
        // Returns true if the editing is successful, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to register a new user
    async registerUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { name, lastName1, lastName2, email, password } = req.body;
            const UserControllerObject = new UserController();
            const response = await UserControllerObject.registerUser(name, lastName1, lastName2, email, password);
            const token = response.token;
            delete response.token;
            res.cookie("token", token, { httpOnly: true });
            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined });
        }
    }

    // Method to log in
    // login(email: string, password: string): boolean {
    async logIn(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        try {
            const { email, password } = req.params;
            const UserControllerObject = new UserController();
            const response = await UserControllerObject.logIn(email, password);
            const token = response.token;
            delete response.token;
            res.cookie("token", token, { httpOnly: true });
            if (response?.loggedIn && response?.user?.email) {
                const EmailControllerObject = new EmailController();
                /*EmailControllerObject.sendEmail(
                    [""],
                    "Nuevo inicio de sesión",
                    `<p>Se ha iniciado sesión en su cuenta.</p>`,
                    null
                );*/
            }
            return res.status(200).json(response);
        } catch (error: any) {
            console.log(error);
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined });
        }
    }

    // Method to check if the user is logged in
    async loggedIn(req: Request, res: Response): Promise<Response> {
        try {
            const UserControllerObject = new UserController();
            const token = req.cookies.token;
            const response = await UserControllerObject.loggedIn(token);
            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined });
        }
    }

    // Method to get a list of products
    async getProductList(req: Request, res: Response): Promise<Response> {
        try {
            const ProductControllerObject = new ProductController();
            const response = await ProductControllerObject.getProductList();
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined } );
        }
    }

    // Method to get product details by ID
    async getProduct(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const ProductControllerObject = new ProductController();
            const response = await ProductControllerObject.getProduct(id);
            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined } );
        }
    }

    // Method to create a new product
    async createProduct(req: Request, res: Response): Promise<Response> {
        try {
            const {
                name,
                description,
                category,
                imageUrl,
                price,
                weight,
                available,
            } = req.body;
            const ProductControllerObject = new ProductController();
            const response = await ProductControllerObject.createProduct(
                name,
                description,
                category,
                imageUrl,
                parseInt(price),
                parseFloat(weight),
                available
            );
            return response
                ? res.status(200).json({ message: "Ok" })
                : res.status(400).json({});
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined } );
        }
    }

    // Method to edit a product
    async editProduct(req: Request, res: Response): Promise<Response> {
        try {
            const {
                id,
                name,
                description,
                category,
                imageUrl,
                price,
                weight,
                available,
            } = req.body;
            const ProductControllerObject = new ProductController();
            const response = await ProductControllerObject.editProduct(
                id,
                name,
                description,
                category,
                imageUrl,
                price,
                weight,
                available
            );
            return response
                ? res.status(200).json({ message: "Ok" })
                : res.status(400).json({});
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined } );
        }
    }

    // Method to delete a product
    async deleteProduct(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const ProductControllerObject = new ProductController();
            const response = await ProductControllerObject.deleteProduct(id);
            return response
                ? res.status(200).json({ message: "Ok" })
                : res.status(400).json({});
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined } );
        }
    }

    // Method to create a product category
    async createProductCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { description } = req.body;
            const ProductControllerObject = new ProductController();
            const response = await ProductControllerObject.createProductCategory(description);
            return response
                ? res.status(200).json({ message: "Ok" })
                : res.status(400).json({});
        } catch (error: any) {
            console.log("error en master controller")
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined } );
        }
    }

    // Method to get a list of product categories
    async getProductCategoryList(req: Request, res: Response): Promise<Response> {
        try {
            const ProductControllerObject = new ProductController();
            const response = await ProductControllerObject.getProductCategoryList();
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined } );
        }
    }

    // Method to delete a product category
    async deleteProductCategory(req: Request, res: Response): Promise<Response> {
        try {
            const description = req.params.description;
            const ProductControllerObject = new ProductController();
            const response = await ProductControllerObject.deleteProductCategory(description);
            return response
                ? res.status(200).json({ message: "Ok" })
                : res.status(400).json({});
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined } );
        }
    }

    // Method to edit a product category
    async editProductCategory(req: Request, res: Response): Promise<Response> {
        try {
            const { description, newDescription } = req.body;
            console.log(description, newDescription)
            const ProductControllerObject = new ProductController();
            const response = await ProductControllerObject.editProductCategory(
                description,
                newDescription
            );
            return response
                ? res.status(200).json({ message: "Ok" })
                : res.status(400).json({});
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined } );
        }
    }

    async getImageList(req:Request, res: Response): Promise<Response> {
        try{
            const ImageControllerObject = new ImageController();
            const response = await ImageControllerObject.getImageList();
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined });
        }
    }

    // Method to delete an image subcategory
    deleteImageSubcategory(req: Request, res: Response) {
        // Logic to delete an image subcategory
        const ImageControllerObject = new ImageController();

        try {
            const subcategory : any = req.params.subcategory
            var texto: string
            if ((subcategory===undefined) || (subcategory === "undefined") ) {
                texto = "" 
            } else{
                texto = subcategory
            }
            ImageControllerObject.deleteImageSubcategory(String(req.params.category), texto).then((result) => {
                res.status(200).json({ message: "Ok" })
            }).catch((error)=>{
                res.status(400).json({ message: error[0] ? error[0].customError : undefined })
            });
        } catch (error) {
            res.status(400).json({});
        }
    }
    
    // Method to delete an image category
    deleteImageCategory(req: Request, res: Response) {
        // Logic to delete an image category
        const ImageControllerObject = new ImageController();

        try {
            const category:any = req.params.category
            const description:any = req.params.description
            var texto: string
            if (category===undefined) {
                texto = description 
            } else{
                texto = category
            }
            ImageControllerObject.deleteImageCategory(texto).then((result) => {
                res.status(200).json({ message: "Ok" })
            }).catch((error)=>{
                res.status(400).json({ message: error[0] ? error[0].customError : undefined })
            });
        } catch (error) {
            res.status(400).json({});
        }
    }

    // Method to create an image subcategory
    createImageSubcategory(req: Request, res: Response) {
        // Logic to create an image subcategory
        const ImageControllerObject = new ImageController();

        try {
            ImageControllerObject.createImageSubcategory(String(req.body.category), String(req.body.subcategory)).then((result) => {
                res.status(200).json({ message: "Ok" })
            }).catch((error)=>{
                res.status(400).json({ message: error[0] ? error[0].customError : undefined })
            });
        } catch (error) {
            res.status(400).json({});
        }
    }

    // Method to edit an image subcategory
    editImageSubcategory(req: Request, res: Response) {
        // Logic to edit an image subcategory
        const ImageControllerObject = new ImageController();

        try {
            const subcategory : any = req.body.subcategory
            var texto: string
            if ((subcategory===undefined) || (subcategory === "undefined") ) {
                texto = ""
            } else{
                texto = subcategory
            }
            console.log(texto)
            ImageControllerObject.editImageSubcategory(String(req.body.category), texto, String(req.body.newSubcategory)).then((result) => {
                res.status(200).json({ message: "Ok" })
            }).catch((error)=>{
                res.status(400).json({ message: error[0] ? error[0].customError : undefined })
            });
        } catch (error) {
            res.status(400).json({});
        }
    }

    // Method to create an image category
    createImageCategory(req: Request, res: Response) {
        // Logic to create an image category
        const ImageControllerObject = new ImageController();

        try {
            const category : string = req.body.category
            const description : string = req.body.description
            var texto: string
            if (category===undefined) {
                texto = description 
            } else{
                texto = category
            }
            ImageControllerObject.createImageCategory(texto).then((result) => {
                res.status(200).json({ message: "Ok" })
            }).catch((error)=>{
                res.status(400).json({ message: error[0] ? error[0].customError : undefined })
            });
        } catch (error) {
            res.status(400).json({});
        }
    }

    // Method to edit an image category
    editImageCategory(req: Request, res: Response) {
        // Logic to edit an image category
        const ImageControllerObject = new ImageController();
        try {
            const category = req.body.category
            const description = req.body.description
            var texto: string
            if (category===undefined) {
                texto = description 
            } else{
                texto = category
            }
            const new_category = req.body.new_category
            const newDescription = req.body.newDescription
            var newTexto: string
            if (category===undefined) {
                newTexto = newDescription 
            } else{
                newTexto = new_category
            }
            ImageControllerObject.editImageCategory(texto, newTexto).then((result) => {
                res.status(200).json({ message: "Ok" })
            }).catch((error)=>{
                res.status(400).json({ message: error[0] ? error[0].customError : undefined })
            });
        } catch (error) {
            res.status(400).json({});
        }
    }

    // Method to edit an image
    async editImage(req: Request, res: Response):Promise<Response> {
        // Logic to edit an image
        try
        {
            const ImageControllerObject = new ImageController();
            const {id,imageCategory, imageSubcategory, name, description, tags, imageUrl} = req.body;
            const response = await ImageControllerObject.editImage(
                id,
                imageCategory, 
                imageSubcategory, 
                name, 
                description, 
                tags,
                imageUrl);
            return response 
            ? res.status(200).json({response: "Ok"}) 
            : res.status(400).json({response:  undefined});
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined } );
        }
        
    }

    // Method to create an image
    async createImage(req:Request, res: Response): Promise<Response> {
        // Logic to create an image
        try{
            const {imageCategory, imageSubcategory, name, description, tags, imageUrl} = req.body;
            const ImageControllerObject = new ImageController();
            const response = await ImageControllerObject.createImage(
                imageCategory, 
                imageSubcategory, 
                name, 
                description, 
                tags, 
                imageUrl
                );
                return res.json(response);
            } catch (error: any) {
                return res.status(400).json({ message: error[0] ? error[0].customError : undefined } );
            } 
    }

     // Method to delete an image
     async deleteImage(req:Request, res: Response): Promise<Response> {
        // Logic to delete an image
        try{
            const id = Number(req.params.id);
            const ImageControllerObject = new ImageController();
            const response = await ImageControllerObject.deleteImage(id);
            return response 
            ? res.status(200).json({response: "Ok"}) 
            : res.status(400).json({response:  undefined});
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined } );
        }
    }

    // Method to get an image
    async getImage(req:Request, res: Response): Promise<Response> {
        // Logic to get an image
        try{
            const id = Number(req.params.id);
            const ImageControllerObject = new ImageController();
            const response = await ImageControllerObject.getImage(id);
            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined });
        }
    }

    // Method to get a list of image categories
    getImageCategoryList(req: Request, res: Response) {
        // Logic to retrieve a list of image categories
        const ImageControllerObject = new ImageController();

        try {
            ImageControllerObject.getImageCategoryList().then((result) => {
                res.status(200).json(result)
            }).catch((error)=>{
                res.status(400).json({ message: error[0] ? error[0].customError : undefined })
            });
        } catch (error) {
            res.status(400).json({});
        }
        
    }

    // Method to create an order
    async createOrder(req:Request,res:Response): Promise<Response> {
       try{
        const {province, canton, district, specificAddress, shippingFee, products, userId, imageUrl} = req.body;
        const OrderControllerObject = new OrderController();
        const response = await OrderControllerObject.createOrder(province, canton, district, specificAddress, shippingFee, products, userId, imageUrl);
        return response
        ? res.status(200).json({response: "Ok"})
        : res.status(400).json({response: undefined});
       } catch(error:any){
        return res.status(400).json({ message: error[0] ? error[0].customError : undefined });
       }
    }

    // Method to edit an order
    async editOrder(req: Request, res:Response): Promise<Response> {
        try{
            const {id, status} = req.body;
            const OrderControllerObject = new OrderController();
            const response = await OrderControllerObject.editOrder(id, status);
            return response 
            ? res.status(200).json({response: "Ok"}) 
            : res.status(400).json({response:  undefined});
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined });
        }
    }

    async getOrderList(req: Request, res:Response): Promise<Response> {
        try{
            const OrderControllerObject = new OrderController();
            const response = await OrderControllerObject.getOrderList();
            return res.json(response);
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined });
        }
    }

    async getOrderDetails(req: Request, res:Response): Promise<Response> {
        try{
            const id = Number(req.params.id);
            const OrderControllerObject = new OrderController();
            const response = await OrderControllerObject.getOrderDetails(id);
            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined });
        }
    }

    async deleteOrder(req: Request, res:Response): Promise<Response> {
        try{
            const id = Number(req.params.id);
            const OrderControllerObject = new OrderController();
            const response = await OrderControllerObject.deleteOrder(id);
            return response 
            ? res.status(200).json({response: "Ok"}) 
            : res.status(400).json({response:  undefined});
        } catch (error: any) {
            return res.status(400).json({ message: error[0] ? error[0].customError : undefined });
        }
    }

    // Method to add a product to the shopping cart
    addProduct(product: Product): void {
        // Logic to add a product to the shopping cart
    }

    // Method to delete a product from the shopping cart
    deleteProductCart(idProduct: number): void {
        // Logic to delete a product from the shopping cart
    }

    // Method to clear the shopping cart
    clearCart(): void {
        // Logic to clear the shopping cart
    }

    // Method to confirm an action
    confirm(): boolean {
        // Logic to confirm an action
        // Returns true if the action is confirmed, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to notify
    notify(): boolean {
        // Logic to notify
        // Returns true if the notification is successful, otherwise returns false
        return true; // Change this with real logic
    }
}
