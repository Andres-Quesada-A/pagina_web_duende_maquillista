import { Decorator } from "./Decorator";
import { Notification } from "./Notification";

export class PushDecorator extends Decorator {
    async notify(data: any): Promise<Notification> {
        const notification = await super.notify(data);
        console.log("PushDecorator.notify");
        return notification;
    }
}