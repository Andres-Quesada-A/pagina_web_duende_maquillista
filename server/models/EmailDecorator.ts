import { Decorator } from "./Decorator";
import { Notification } from "./Notification";
import { EmailController } from "../controllers/EmailController";

export class EmailDecorator extends Decorator {
    async notify(data: any): Promise<Notification> {
        const notification = await super.notify(data);

        const emailController = new EmailController();

        emailController.sendEmail(
            [notification.getUser().getEmail()],
             notification.getTitle(), 
             `<p>${notification.getDescription()}</p>`,
              notification.getMoreDetailsUrl()
              );
        return notification
    }
}