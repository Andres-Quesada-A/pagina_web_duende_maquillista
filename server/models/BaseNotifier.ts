import { Notifier } from "./Notifier";
import { User } from "./User";
import { Notification } from "./Notification";
import { NotificationController } from "../controllers/NotificationController";
export class BaseNotifier implements Notifier {
    async notify(data: any): Promise<Notification> {
        const controller = new NotificationController();
        const notification = await controller.createNotification(
            data.category,
            data.userId,
            data.title,
            data.description,
            data.url);
        return notification;
    }
}