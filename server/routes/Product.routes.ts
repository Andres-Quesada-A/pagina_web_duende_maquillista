import { Router } from "express";

import { MasterController } from "../controllers/MasterController";

const MasterControllerObject = new MasterController();

const ProductRouter = Router();

ProductRouter.get(`/get_product_list`, MasterControllerObject.getProductList);
ProductRouter.get(`/get_product/:id`, MasterControllerObject.getProduct);
ProductRouter.post(`/create_product`, MasterControllerObject.createProduct);
ProductRouter.put(`/edit_product`, MasterControllerObject.editProduct);
ProductRouter.delete(`/delete_product/:id`, MasterControllerObject.deleteProduct);

export default ProductRouter;