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
    console.log(` requiere la implementacion de las intrucciones correctas: ${data}`);
  }
}
// Concrete listener 2
export class NotificationListener implements Listener {
  constructor() { }
  update(data: any): void {
    let stack = new BaseNotifier();
    stack = new EmailDecorator(stack);
    stack = new PushDecorator(stack);
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
    this.listeners.push(listener);
  }
  removeListener(listener: Listener): void {
    this.listeners = this.listeners.filter(listenerObject => listenerObject !== listener);
  }
  notifyListener(data: any): void {
    this.listeners.forEach(listener => listener.update(data));
  }
}

// Example usage
//const observer1 = new AgendaListener("Observer 1");
//const observer2 = new NotificationListener("Observer 2");
//
//const subject = new ListenersManager();
//subject.addListener(observer1);
//subject.addListener(observer2);
//
//subject.notifyListener("Data update 1");
//// Output:
//// Observer 1 received update: Data update 1
//// Observer 2 received update: Data update 1
//
//subject.removeListener(observer1);
//
//subject.notifyListener("Data update 2");
// Output:
// Observer 2 received update: Data update 2