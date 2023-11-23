import { Notification } from "../models/Notification";
import { NotificationCategory } from "../models/NotificationCategory";
import ConnectionDAO from "./ConnectionDAO";
import sqlcon from 'mssql';

export class NotificationDAO {
    private static instance: NotificationDAO;

    private constructor() { }

    static getInstance(): NotificationDAO {
        if (!NotificationDAO.instance) {
            NotificationDAO.instance = new NotificationDAO();
        }

        return NotificationDAO.instance;
    }

    async getNotificationList(userEmail: string): Promise<Notification[]> {
        // Logic to get notifications from database

        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_Notifications_List", { "IN_userEmail": userEmail }).then((result) => {
                    if (result && result.recordset) {
                        const notifications: [] = result.recordset.map((notification: any) => {
                            return new Notification(
                                notification.NotificationID,
                                notification.Title,
                                notification.Description,
                                notification.Timestamp,
                                new NotificationCategory(notification.Category),
                                notification.MoreDetailsUrl
                            );
                        });
                        resolve(notifications);
                    }
                    else {
                        // case when the query did not return any data
                        damage.push({ customError: String(result.customError) });
                        reject(damage);
                    }
                })
                    .catch((error) => {
                        //fail in the execution of the query
                        damage.push({ customError: error.customError });
                        reject(damage);
                    });
            }
            catch (error) {
                //fail in the connection to the database
                reject(damage);
            }
        });
    }

    async deleteNotification(id: number): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query("Duende_SP_Notifications_Delete", { "IN_notificationID": id }).then((result) => {
                    resolve(true);
                })
                    .catch((error) => {
                        //fail in the execution of the query
                        damage.push({ customError: error.customError });
                        reject(damage);
                    });
            } catch (error) {
                //fail in the connection to the database
                reject(damage);
            }
        });
    }

    async createNotification(
        category: string,
        userId: number,
        title: string,
        description: string,
        moreDetailsUrl?: string
    ): Promise<Notification | undefined> {

        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try{
                SQL.query("Duende_SP_Notifications_Add", {
                    "IN_category": category,
                    "IN_userID": userId,
                    "IN_title": title,
                    "IN_description": description,
                    "IN_moreDetailsUrl": moreDetailsUrl
                }).then((result) => {
                    const notification :any = result?.recordset[0];
                    const notificationObj = new Notification(
                        notification.id,
                        notification.title,
                        notification.description,
                        notification.timestamp,
                        new NotificationCategory(notification.category),
                        notification.moreDetailsUrl
                    );
                    resolve(notificationObj);
                })
                .catch((error) => {
                    //fail in the execution of the query
                    damage.push({customError: error.customError});
                    reject(damage);
                });
            }catch(error){
                //fail in the connection to the database
                reject(damage);
            }
        });
    }
}