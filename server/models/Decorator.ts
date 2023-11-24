import { Notifier } from "./Notifier";
import { Notification } from "./Notification";
export abstract class Decorator implements Notifier {
    constructor(protected notifier: Notifier) { }

    async notify(data:any):Promise<Notification> {
        return this.notifier.notify(data);
    }
}

