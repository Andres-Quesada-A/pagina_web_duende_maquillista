import { Notification } from "./Notification";
export interface Notifier {
    notify(data:any): Promise<Notification>;
}