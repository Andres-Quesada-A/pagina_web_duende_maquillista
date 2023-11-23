export class Event {
  
  private id: number ;
  private title: string;
  private category: string;
  private startTime:string ;
  private endTime: string;
  private description: string;
  private orderId: number;
  
    constructor(
      id: number ,
      title: string,
      category: string,
      startTime:string ,
      endTime: string,
      description: string,
      orderId: number = -1
    ) {
      this.id = id
      this.title = title
      this.category = category
      this.startTime = startTime
      this.endTime = endTime
      this.description = description
      this.orderId = orderId
    }
  }