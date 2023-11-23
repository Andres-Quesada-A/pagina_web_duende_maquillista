import { NotifierDecorator } from "./NotifierDecorator";

export class RealTimeNotificationDecorator extends NotifierDecorator {
    notify() {
        super.notify();
        console.log("RealTimeNotificationDecorator.notify");
    }
}