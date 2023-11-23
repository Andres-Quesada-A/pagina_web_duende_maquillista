import { Event } from "../models/Event"
import { EventCategory } from "../models/EventCategory"
import ConnectionDAO from "./ConnectionDAO";
export class EventDAO {

    async createEvent(title: string, category: string, startTime:Date , endTime: Date, description: string, orderId?: number): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query('Duende_SP_Events_Add',
                    {
                        'IN_title': title,
                        'IN_category': category,
                        'IN_startTime': startTime,
                        'IN_endTime': endTime,
                        'IN_description': description,
                        'IN_orderId': orderId === undefined? null : orderId
                    }).then((result) => {
                        resolve(true);
                    }).catch((error) => {
                        //fail in the execution of the query
                        damage.push({ customError: error.customError });
                        reject(false);
                    })
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        })

    }

    async editEvent(id: number , title: string, category: string, startTime:Date , endTime: Date, description: string, orderId?: number): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query('Duende_SP_Events_Edit',
                    {
                        'IN_eventId': id,
                        'IN_title': title,
                        'IN_category': category,
                        'IN_startTime': startTime,
                        'IN_endTime': endTime,
                        'IN_description': description,
                        'IN_orderId': orderId === undefined? null : orderId
                    }).then((result) => {
                        resolve(true);
                    }).catch((error) => {
                        //fail in the execution of the query
                        damage.push({ customError: error.customError });
                        reject(false);
                    })
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        })
    }

    getEvent(id: number): Promise<Event> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try{
                SQL.query('Duende_SP_Events_Details', { 'IN_eventId': id })
                .then((result) => {
                    const event = result?.recordset[0]
                    const EventObj = new Event(
                        event.id,
                        event.title,
                        event.startTime,
                        event.endTime,
                        event.category,
                        event.description,
                        event.orderId? event.orderId: null
                    );
                    resolve(event);
                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(damage);
                })
            } catch(error) {
                // any errors that occur during the process
                reject(damage);
            }
        });
    }

    async getEventList(startTime?: Date, endTime?: Date): Promise<Event[]> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try{

                if (startTime === undefined) {
                    damage.push({ customError: "Valor de la fecha inicio no válido" });
                    throw new Error("Valor de la fecha no válido")
                }
                if (endTime === undefined) {
                    damage.push({ customError: "Valor de la fecha final no válido" });
                    throw new Error("Valor de la fecha no válido")
                }

                SQL.query('Duende_SP_Events_List', { 'IN_startTime': !isNaN(startTime.getTime())? startTime: null, 'IN_endTime': !isNaN(endTime.getTime())? endTime: null  })
                .then((result) => {
                    const eventlist = result?.recordset.map(
                        (event: any) =>{ 
    
                        const EventObj = new Event(
                            event.id,
                            event.title,
                            event.startTime,
                            event.endTime,
                            event.category,
                            event.description,
                            event.orderId? event.orderId: null
                        );
                        return EventObj;
                    }
                    )
                    resolve(eventlist);
                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(damage);
                })
            } catch(error) {
                // any errors that occur during the process
                reject(damage);
            }
        });
    }

    async deleteEvent(id: number): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try{
                SQL.query('Duende_SP_Events_Delete', { 'IN_eventId': id })
                .then((result) => {
                    resolve(true);
                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(false);
                })
            } catch(error) {
                // any errors that occur during the process
                reject(damage);
            }
        });
    }

    async getEventCategories(): Promise<EventCategory[]> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try{
                SQL.query('Duende_SP_EventCategories_List', {})
                .then((result) => {
                    const categorylist = result?.recordset.map(
                        (category: any) =>{ 
                        const CategoryObj = new EventCategory(
                            category.description
                        );
                        return CategoryObj;
                    }
                    )

                    resolve(categorylist);
                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(damage);
                })
            } catch(error) {
                // any errors that occur during the process
                reject(damage);
            }
        });
    }

}
