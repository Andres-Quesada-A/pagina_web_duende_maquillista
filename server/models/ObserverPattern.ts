import { EventController } from "../controllers/EventController";
import { BaseNotifier } from "./BaseNotifier";
import { EmailDecorator } from "./EmailDecorator";
import { PushDecorator } from "./PushDecorator";

// listener interface
interface Listener {
  update(data: any): void;
}
// Concrete listener 1
export class AgendaListener implements Listener {
  constructor() { }

  update(data: any): void {
    const eventControl = new EventController();
    
    if (data.status === "ACCEPTED") {
      eventControl.createEvent("Entrega de orden", "Entrega", data.deliveryDate.startDateTime, data.deliveryDate.endDateTime, `Orden #${data.id}`, Number(data.id))
    } else {
      // Tries to delete the event, if it doesn't exist, it does nothing
      try {
        eventControl.deleteEvent(undefined, Number(data.id));
      } catch (error) {
        console.log(error);
      }
    }
  }
}
// Concrete listener 2
export class NotificationListener implements Listener {
  constructor() { }
  update(data: any): void {
    let stack = new BaseNotifier();
    stack = new EmailDecorator(stack);
    stack = new PushDecorator(stack);

    stack.notify(data);
  }
}

// Concrete Subject
export class ListenersManager {
  private listeners: Listener[] = [];

  private static instance: ListenersManager;

  private constructor() {
    // Singleton
  }

  public static getInstance(): ListenersManager {
    if (!ListenersManager.instance) {
      ListenersManager.instance = new ListenersManager();
    }
    return ListenersManager.instance;
  }

  addListener(listener: Listener): void {
    console.log("ListenersManager.addListener");
    this.listeners.push(listener);
  }
  removeListener(listener: Listener): void {
    this.listeners = this.listeners.filter(listenerObject => listenerObject !== listener);
  }
  notifyListener(data: any): void {
    this.listeners.forEach(listener => listener.update(data));
  }
}

let listenerManager = ListenersManager.getInstance();
const agendaListener: AgendaListener = new AgendaListener();
const notificationListener: NotificationListener = new NotificationListener();
listenerManager.addListener(agendaListener);
listenerManager.addListener(notificationListener);