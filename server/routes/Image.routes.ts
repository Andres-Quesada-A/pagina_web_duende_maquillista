import {Router} from 'express'

import {MasterController} from '../controllers/MasterController'

const MasterControllerObject = new MasterController()

const ImageRouter = Router()
//get -> query
//post -> body
//put -> body
//delete ->query
ImageRouter.get(`/get_image_list`, MasterControllerObject.getImageList)
ImageRouter.get(`/get_image/:id`, MasterControllerObject.getImage)
ImageRouter.post(`/create_image`, MasterControllerObject.createImage)
ImageRouter.put(`/edit_image/`, MasterControllerObject.editImage)
ImageRouter.delete(`/delete_image/:id`, MasterControllerObject.deleteImage)

export default ImageRouter