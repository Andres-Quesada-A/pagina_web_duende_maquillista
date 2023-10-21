import {Router} from 'express'

import {MasterController} from '../controllers/MasterController'

const MasterControllerObject = new MasterController()

const ImageSubcategoryRouter = Router()
//get -> query
//post -> body
//put -> body
//delete ->query
ImageSubcategoryRouter.get(`/get_category`, MasterControllerObject.getImageCategoryList)
ImageSubcategoryRouter.post(`/create_category/:category`, MasterControllerObject.createImageCategory)
ImageSubcategoryRouter.put(`/edit_category/:category/:new_category`, MasterControllerObject.editImageCategory)
ImageSubcategoryRouter.delete(`/delete_category/:category`, MasterControllerObject.deleteImageCategory)

export default ImageSubcategoryRouter