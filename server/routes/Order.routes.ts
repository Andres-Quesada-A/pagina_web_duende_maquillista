import { Router } from "express";

import { MasterController } from "../controllers/MasterController";

const MasterControllerObject = new MasterController();

const OrderRouter = Router();
//get -> query
//post -> body
//put -> body
//delete ->query
OrderRouter.get(`/get_order_list`, MasterControllerObject.getOrderList);
OrderRouter.get(`/get_order/:id`, MasterControllerObject.getOrder);
OrderRouter.post(`/create_order`, MasterControllerObject.createOrder);
OrderRouter.put(`/edit_order/`, MasterControllerObject.editOrder);
OrderRouter.delete(`/delete_order/:id`, MasterControllerObject.deleteOrder);