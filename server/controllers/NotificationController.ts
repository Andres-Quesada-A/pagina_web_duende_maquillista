import { Notification } from "../models/Notification";
import { NotificationDAO } from "../DAOS/NotificationDAO";

export class NotificationController {
    private NotificationDAO: NotificationDAO

    constructor() {
        this.NotificationDAO = NotificationDAO.getInstance();
    }

    // Method to get a list of notifications
    async getNotificationList(userEmail: string): Promise<Notification[]> {
        const response = await this.NotificationDAO.getNotificationList(userEmail);
        return response;
    }

    // Method to delete a notification
    async deleteNotification(id: number): Promise<boolean> {
        const response = await this.NotificationDAO.deleteNotification(id);
        return response;
    }

    async createNotification(
        category: string,
        userId: number,
        title: string,
        description: string,
        moreDetailsUrl?: string): Promise<Notification> {
        const response = await this.NotificationDAO.createNotification(category, userId, title, description, moreDetailsUrl);
        return response;
    }

}