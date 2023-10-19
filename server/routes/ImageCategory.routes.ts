import {Router} from 'express'

import {MasterController} from '../controllers/MasterController'

const MasterControllerObject = new MasterController()

const UserRouter = Router()
//get -> query
//post -> body
//put -> body
//delete ->query
UserRouter.get(`/get_category`, MasterControllerObject.getImageCategoryList)
UserRouter.post(`/register_category`, MasterControllerObject.createImageCategory)
UserRouter.put(`/edit_category`, MasterControllerObject.editImageCategory)
UserRouter.delete(`/delete/:category`, MasterControllerObject.deleteImageCategory)

export default UserRouter