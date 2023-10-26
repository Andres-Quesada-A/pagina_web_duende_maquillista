import { Router } from "express";

import { MasterController } from "../controllers/MasterController";

const MasterControllerObject = new MasterController();

const UserRouter = Router();

UserRouter.post(`/login/:email/:password`, MasterControllerObject.logIn);
UserRouter.get(`/login`, MasterControllerObject.loggedIn);
UserRouter.post(`/register_user`, MasterControllerObject.registerUser);
UserRouter.put(`/update_user`, MasterControllerObject.editUser);
// UserRouter.delete(`/delete_user/:idUser`, )
UserRouter.post(`/request_password_reset/:email`, MasterControllerObject.requestPasswordReset);

export default UserRouter;