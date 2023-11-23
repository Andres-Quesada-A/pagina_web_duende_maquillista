import { NotifierDecorator } from "./NotifierDecorator";

export class EmailNotificationDecorator extends NotifierDecorator {
    notify() {
        super.notify();
        console.log("EmailNotificationDecorator.notify");
    }
}