import { Notifier } from "./Notifier";

export class NotifierDecorator implements Notifier {
    constructor(protected notifier: Notifier) { }

    notify() {
        this.notifier.notify();
    }
}

