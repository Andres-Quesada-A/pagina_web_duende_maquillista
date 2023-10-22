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

export class MasterController {
    private users: User[]; // Suppose you have a User class to represent users
    private products: Product[]; // Suppose you have a Product class to represent products
    private productCategories: ProductCategory[]; // Suppose you have a ProductCategory class to represent product categories
    private images: Image[]; // Suppose you have an Image class to represent images
    private orders: Order[]; // Suppose you have an Order class to represent orders
    private shoppingCart: ShoppingCart; // Suppose you have a ShoppingCart class to represent shopping carts
    private ProductController: ProductController;

    constructor() {
        this.users = [];
        this.products = [];
        this.productCategories = [];
        this.images = [];
        this.orders = [];
        this.shoppingCart = new ShoppingCart();
        this.ProductController = new ProductController();
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
        const {name, lastName1, lastName2, email, password} = req.body;
        const UserControllerObject = new UserController()
        const response = await UserControllerObject.registerUser(name, lastName1, lastName2, email, password)
        console.log(response, "response")
        return response ? res.status(200).json({response: true}) : res.status(400).json({response: false}); // Change this with real logic
    }

    // Method to log in
    // login(email: string, password: string): boolean {
    async login(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
        const {email, password} = req.params
        const UserControllerObject = new UserController()
        const response = await UserControllerObject.login(email, password)
        return response ? res.status(200).json({response: true}) : res.status(400).json({response: false});
    }

    // Method to get a list of products by category
    getProductList(req: Request, res: Response): Response {
        // Logic to retrieve a list of products by category
        const category = req.params.category;
        const response = this.ProductController.getProductList(category);
        return res.json(response);
    }

    // Method to get product details by ID
    getProduct(req: Request, res: Response): Response {
        // Logic to retrieve product details by ID
        const id = Number(req.params.id);
        const response = this.ProductController.getProduct(id);
        return res.json(response);
    }

    // Method to create a new product
    createProduct(req: Request, res: Response): Response {
        // Logic to create a new product
        // Returns true if the creation is successful, otherwise returns false
        const {
            name,
            description,
            category,
            imageUrl,
            price,
            weight,
            available,
        } = req.body;
        const response = this.ProductController.createProduct(
            name,
            description,
            category,
            imageUrl,
            price,
            weight,
            available
        );
        return res.json(response);
    }

    // Method to edit a product
    editProduct(req: Request, res: Response): Response {
        // Logic to edit a product
        // Returns true if the editing is successful, otherwise returns false
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
        const response = this.ProductController.editProduct(
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
            ? res.status(200).json({ status: "ok" })
            : res.status(400).json({ status: "error" });
    }

    // Method to delete a product
    deleteProduct(req: Request, res: Response): Response {
        // Logic to delete a product
        // Returns true if the deletion is successful, otherwise returns false
        const id = Number(req.params.id);
        const response = this.ProductController.deleteProduct(id);
        return response
            ? res.status(200).json({ status: "ok" })
            : res.status(400).json({ status: "error" });
    }

    // Method to create a product category
    createProductCategory(category: string): boolean {
        // Logic to create a product category
        // Returns true if the creation is successful, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to get a list of product categories
    getProductCategoryList(): ProductCategory[] {
        // Logic to retrieve a list of product categories
        return []; // Change this with real logic
    }

    // Method to delete a product category
    deleteProductCategory(category: string): boolean {
        // Logic to delete a product category
        // Returns true if the deletion is successful, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to edit a product category
    editProductCategory(category: string, newCategory: string): boolean {
        // Logic to edit a product category
        // Returns true if the editing is successful, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to get a list of images by category and subcategory
    getImageList(category: string, subcategory: string): Image[] {
        // Logic to retrieve a list of images by category and subcategory
        return []; // Change this with real logic
    }

    // Method to delete an image subcategory
    deleteImageSubcategory(req: Request, res: Response) {
        // Logic to delete an image subcategory
        const ImageControllerObject = new ImageController();

        try {
            ImageControllerObject.deleteImageSubcategory(String(req.params.category), String(req.params.subcategory)).then((result) => {
                res.setHeader("Content-Type", "application/json").json(result)
            }).catch((error)=>{
                res.setHeader("Content-Type", "application/json").status(400).json(error)
            });
        } catch (error) {
            const damage: { error: boolean, message: string }[] = [{error: true, message: "ocurrio un error imprevisto"}];
            res.setHeader("Content-Type", "application/json").status(400).json(damage)
        }
    }
    
    // Method to delete an image category
    deleteImageCategory(req: Request, res: Response) {
        // Logic to delete an image category
        const ImageControllerObject = new ImageController();

        try {
            ImageControllerObject.deleteImageCategory(String(req.params.category)).then((result) => {
                res.setHeader("Content-Type", "application/json").json(result)
            }).catch((error)=>{
                res.setHeader("Content-Type", "application/json").status(400).json(error)
            });
        } catch (error) {
            const damage: { error: boolean, message: string }[] = [{error: true, message: "ocurrio un error imprevisto"}];
            res.setHeader("Content-Type", "application/json").status(400).json(damage)
        }
    }

    // Method to create an image subcategory
    createImageSubcategory(req: Request, res: Response) {
        // Logic to create an image subcategory
        const ImageControllerObject = new ImageController();

        try {
            ImageControllerObject.createImageSubcategory(String(req.params.category), String(req.params.subcategory)).then((result) => {
                res.setHeader("Content-Type", "application/json").json(result)
            }).catch((error)=>{
                res.setHeader("Content-Type", "application/json").status(400).json(error)
            });
        } catch (error) {
            const damage: { error: boolean, message: string }[] = [{error: true, message: "ocurrio un error imprevisto"}];
            res.setHeader("Content-Type", "application/json").status(400).json(damage)
        }
    }

    // Method to edit an image subcategory
    editImageSubcategory(req: Request, res: Response) {
        // Logic to edit an image subcategory
        const ImageControllerObject = new ImageController();

        try {
            ImageControllerObject.editImageSubcategory(String(req.params.category), String(req.params.subcategory), String(req.params.new_subcategory)).then((result) => {
                res.setHeader("Content-Type", "application/json").json(result)
            }).catch((error)=>{
                res.setHeader("Content-Type", "application/json").status(400).json(error)
            });
        } catch (error) {
            const damage: { error: boolean, message: string }[] = [{error: true, message: "ocurrio un error imprevisto"}];
            res.setHeader("Content-Type", "application/json").status(400).json(damage)
        }
    }

    // Method to create an image category
    createImageCategory(req: Request, res: Response) {
        // Logic to create an image category
        const ImageControllerObject = new ImageController();

        try {
            ImageControllerObject.createImageCategory(String(req.params.category)).then((result) => {
                res.setHeader("Content-Type", "application/json").json(result)
            }).catch((error)=>{
                res.setHeader("Content-Type", "application/json").status(400).json(error)
            });
        } catch (error) {
            const damage: { error: boolean, message: string }[] = [{error: true, message: "ocurrio un error imprevisto"}];
            res.setHeader("Content-Type", "application/json").status(400).json(damage)
        }
    }

    // Method to edit an image category
    editImageCategory(req: Request, res: Response) {
        // Logic to edit an image category
        const ImageControllerObject = new ImageController();

        try {
            ImageControllerObject.editImageCategory(String(req.params.category), String(req.params.new_category)).then((result) => {
                res.setHeader("Content-Type", "application/json").json(result)
            }).catch((error)=>{
                res.setHeader("Content-Type", "application/json").status(400).json(error)
            });
        } catch (error) {
            const damage: { error: boolean, message: string }[] = [{error: true, message: "ocurrio un error imprevisto"}];
            res.setHeader("Content-Type", "application/json").status(400).json(damage)
        }
    }

    // Method to edit an image
    editImage(
        imageCategory: string,
        imageSubcategory: string,
        name: string,
        description: string,
        date: Date,
        tags: string,
        imageUrl: string
    ): boolean {
        // Logic to edit an image
        // Returns true if the editing is successful, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to create an image
    createImage(
        imageCategory: string,
        imageSubcategory: string,
        name: string,
        description: string,
        date: Date,
        tags: string,
        imageUrl: string
    ): boolean {
        // Logic to create an image
        // Returns true if the creation is successful, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to get a list of image categories
    getImageCategoryList(req: Request, res: Response) {
        // Logic to retrieve a list of image categories
        const ImageControllerObject = new ImageController();

        try {
            ImageControllerObject.getImageCategoryList().then((result) => {
                res.setHeader("Content-Type", "application/json").json(result)
            }).catch((error)=>{
                res.setHeader("Content-Type", "application/json").status(400).json(error)
            });
        } catch (error) {
            const damage: { error: boolean, message: string }[] = [{error: true, message: "ocurrio un error imprevisto"}];
            res.setHeader("Content-Type", "application/json").status(400).json(damage)
        }
        
    }

    // Method to create an order
    createOrder(
        province: string,
        canton: string,
        district: string,
        specificAddress: string,
        cart: ShoppingCart,
        imageUrl: string
    ): boolean {
        // Logic to create an order
        // Returns true if the creation is successful, otherwise returns false
        return true; // Change this with real logic
    }

    // Method to edit an order
    editOrder(id: number, status: string): boolean {
        // Logic to edit an order
        // Returns true if the editing is successful, otherwise returns false
        return true; // Change this with real logic
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
