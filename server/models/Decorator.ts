import { Notifier } from "./Notifier";

export abstract class Decorator implements Notifier {
    constructor(protected notifier: Notifier) { }

    notify(data:any) {
        this.notifier.notify(data);
    }
}

