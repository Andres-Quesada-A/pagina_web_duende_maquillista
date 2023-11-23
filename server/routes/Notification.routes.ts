import { Router } from "express";
import { MasterController } from "../controllers/MasterController";

const NotificationRouter = Router();
const MasterControllerObject = new MasterController();

NotificationRouter.get(
  `/get_notification_list/:userEmail`,
  MasterControllerObject.getNotificationList
);

NotificationRouter.delete(
  `/delete_notification/:id`,
  MasterControllerObject.deleteNotification
);

export default NotificationRouter;