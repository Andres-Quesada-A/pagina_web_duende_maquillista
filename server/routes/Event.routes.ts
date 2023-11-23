import {Router} from 'express'

import {MasterController} from '../controllers/MasterController'

const MasterControllerObject = new MasterController()

const ImageRouter = Router()
//get -> query
//post -> body
//put -> body
//delete ->query
ImageRouter.get(`/get_event_categories`, MasterControllerObject.getEventCategoryList);
ImageRouter.get(`/get_event_list/:startTime/:endTime`, MasterControllerObject.getEventList)
ImageRouter.get(`/get_event/:id`, MasterControllerObject.getEvent)
ImageRouter.post(`/create_event`, MasterControllerObject.createEvent)
ImageRouter.put(`/edit_event`, MasterControllerObject.editEvent)
ImageRouter.delete(`/delete_event/:id`, MasterControllerObject.deleteEvent)


export default ImageRouter