import {Router} from 'express'

import {MasterController} from '../controllers/MasterController'

const MasterControllerObject = new MasterController()

const ImageCategoryRouter = Router()
//get -> query
//post -> body
//put -> body
//delete ->query
ImageCategoryRouter.post(`/create_subcategory`, MasterControllerObject.createImageSubcategory)
ImageCategoryRouter.put(`/edit_subcategory`, MasterControllerObject.editImageSubcategory)
ImageCategoryRouter.delete(`/delete_subcategory/:category/:subcategory`, MasterControllerObject.deleteImageSubcategory)

export default ImageCategoryRouter