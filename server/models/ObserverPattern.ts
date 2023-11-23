
// listener interface
interface Listener {
  update(data: any): void;
}
// Concrete listener 1
export class AgendaListener implements Listener {
  constructor(private name: string) {}

  update(data: any): void {
    console.log(`${this.name} requiere la implementacion de las intrucciones correctas: ${data}`);
  }
}
// Concrete listener 2
export class NotificationListener implements Listener {
  constructor(private name: string) {}
  update(data: any): void {
    console.log(`${this.name} requiere la implementacion de las intrucciones correctas: ${data}`);
  }
}
// Concrete Subject
export class ListenersManager {
  private liseteners: Listener[] = [];
  addListener(lisetener: Listener): void {
    this.liseteners.push(lisetener);
  }
  removeListener(lisetener: Listener): void {
    this.liseteners = this.liseteners.filter(lisetenerObject => lisetenerObject !== lisetener);
  }
  notifyListener(data: any): void {
    this.liseteners.forEach(listener => listener.update(data));
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