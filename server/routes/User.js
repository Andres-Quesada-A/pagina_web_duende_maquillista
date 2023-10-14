import {Router} from 'express'

import {MasterController} from '../controllers/MasterController'

const MasterControllerObject = new MasterController()

export const UserRouter = Router()

UserRouter.get(`/login/:email/:password`, MasterControllerObject.login)
UserRouter.post(`/register_user`, MasterControllerObject.registerUser)
UserRouter.put(`/update_user`, MasterControllerObject.editUser)
// UserRouter.delete(`/delete_user/:idUser`, )

