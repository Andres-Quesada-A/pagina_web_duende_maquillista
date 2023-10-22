import { Router } from "express";

import { MasterController } from "../controllers/MasterController";

const MasterControllerObject = new MasterController();

const ProductRouter = Router();

ProductRouter.get(`/get_product_list`, MasterControllerObject.getProductList);
ProductRouter.get(`/get_product/:id`, MasterControllerObject.getProduct);
ProductRouter.post(`/create_product`, MasterControllerObject.createProduct);
ProductRouter.put(`/edit_product`, MasterControllerObject.editProduct);
ProductRouter.delete(`/delete_product/:id`, MasterControllerObject.deleteProduct);
ProductRouter.get(`/get_product_category_list`, MasterControllerObject.getProductCategoryList);
ProductRouter.post(`/create_product_category`, MasterControllerObject.createProductCategory);
ProductRouter.put(`/edit_product_category`, MasterControllerObject.editProductCategory);
ProductRouter.delete(`/delete_product_category/:description`, MasterControllerObject.deleteProductCategory);

export default ProductRouter;