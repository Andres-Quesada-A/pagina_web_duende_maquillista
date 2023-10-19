import {Router} from 'express'

import {MasterController} from '../controllers/MasterController'

const MasterControllerObject = new MasterController()

const UserRouter = Router()
//get -> query
//post -> body
//put -> body
//delete ->query
UserRouter.get(`/get_subcategory/:category`, MasterControllerObject.getImageSubcategoryList)
UserRouter.post(`/register_subcategory`, MasterControllerObject.createImageSubcategory)
UserRouter.put(`/edit_subcategory`, MasterControllerObject.editImageSubcategory)
UserRouter.delete(`/delete/:category/:subcategory`, MasterControllerObject.deleteImageSubcategory)

export default UserRouter