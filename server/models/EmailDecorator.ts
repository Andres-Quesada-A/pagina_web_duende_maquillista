import { Decorator } from "./Decorator";

export class EmailDecorator extends Decorator {
    notify(data:any) {
        super.notify(data);
        console.log("PushDecorator.notify");
    }
}