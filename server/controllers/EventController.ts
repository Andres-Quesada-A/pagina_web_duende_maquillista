import { EventDAO} from "../DAOS/EventDAO";
import { Event } from "../models/Event";
import { EventCategory } from "../models/EventCategory";


export class EventController {
    private EventDAO: EventDAO;
    constructor() {
        this.EventDAO = new EventDAO();
    }

    // edits the data of an event
    async editEvent(id: number , title: string, category: string, startTime:Date , endTime:Date, description: string, orderId?: number): Promise<boolean> {
        return await this.EventDAO.editEvent(id, title, category, startTime, endTime, description, orderId);
    }

    // gets the list of events
    async getEventList(startTime:Date , endTime: Date): Promise<Event[]> {
        return  await this.EventDAO.getEventList(startTime, endTime);
    }

    // gets the details of an event
    async getEvent(id: number): Promise<Event | undefined> {
        return await this.EventDAO.getEvent(id);
    }

    // deletes an event
    async deleteEvent(id?: number, orderId?: number): Promise<boolean> {
        return await this.EventDAO.deleteEvent(id, orderId);
    }

    // creates an event
    async createEvent(title: string, category: string, startTime:Date , endTime:Date, description: string, orderId?: number): Promise<boolean> {
        return await this.EventDAO.createEvent(title, category, startTime , endTime, description, orderId);
    }

    async getEventCategoryList(): Promise<EventCategory[]> {
        return await this.EventDAO.getEventCategoryList();
    }
}

