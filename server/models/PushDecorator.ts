import { Decorator } from "./Decorator";
import { Notification } from "./Notification";
import { Socket } from "../socket/WebSocket";

export class PushDecorator extends Decorator {
    async notify(data: any): Promise<Notification> {
        const notification = await super.notify(data);
        const socket = Socket.getInstance({});
        socket.sendToUser(notification.getUser().getId(), JSON.stringify(notification));
        return notification;
    }
}