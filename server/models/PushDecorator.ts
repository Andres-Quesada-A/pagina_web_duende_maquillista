import { Decorator } from "./Decorator";

export class PushDecorator extends Decorator {
    notify(data:any) {
        super.notify(data);
        console.log("PushDecorator.notify");
    }
}