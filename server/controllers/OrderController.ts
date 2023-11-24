import { OrderDAO } from "../DAOS/OrderDAO";
import { Order } from "../models/Order";
import { ShippingDate } from "../models/ShippingDate";
import { ListenersManager } from "../models/ObserverPattern";
import { DateFormatter } from "../Utils/DateFormatter"

const TIMEZONE_OFFSET = -6; // UTC-6 (Costa Rican Timezone)
const deliveryDays = [2, 4, 6]; // Array of days that the delivery service works (0 = Sunday, 1 = Monday, etc.)
const deliveryHours = [7, 9]; // Array of hours that the delivery service works (7:00 AM - 9:00 AM)

export class OrderController {
    private OrderDAO: OrderDAO;
    constructor() {
        this.OrderDAO = new OrderDAO();
    }

    // edits the status of an order
    async editOrder(id: number, status: string): Promise<boolean> {
        const listenersManager = ListenersManager.getInstance();
        const { userId, success } = await this.OrderDAO.editOrder(id, status);
        const options = [{ label: "Pendiente", value: "PENDING" }, { label: "aceptada", value: "ACCEPTED" }, { label: "rechazada", value: "REJECTED" }]

        if (status !== "PENDING") {
            const deliveryDate = this.calculateShippingDate();
            const dateFormatter = new DateFormatter(deliveryDate.startDateTime.getTime() / 1000);

            let category = "";
            let title = `Cambio en estado de su orden #${id}`
            const url = `https://duendemaquillista.azurewebsites.net/order/${id}`;
            let description = `Su orden ha sido ${options.find(option => option.value === status)?.label}`;

            if (status === "ACCEPTED") {
                category="Success";
                description += ` y será enviada el ${dateFormatter.localDateText()}.`;
            } else{
                category="Error";
                description += ".";
            }

            listenersManager.notifyListener({
                userId,
                title,
                description,
                category,
                url,
                deliveryDate,
                status,
                id
            });
            
        }

        return success;
    }

    // gets the list of orders
    async getOrderList(email?: string): Promise<Order[]> {
        const response = await this.OrderDAO.getOrderList(email);
        return response;
    }

    // gets the details of an order
    async getOrderDetails(id: number): Promise<Order | undefined> {
        const response = await this.OrderDAO.getOrderDetails(id);
        return response;
    }

    // deletes an order
    async deleteOrder(id: number): Promise<boolean> {
        const response = await this.OrderDAO.deleteOrder(id);
        return response;
    }

    // creates an order
    async createOrder(
        province: string,
        canton: string,
        district: string,
        specificAddress: string,
        shippingFee: number,
        products: any[],
        userId: number,
        imageUrl: string): Promise<boolean> {
        const response = await this.OrderDAO.createOrder(province, canton, district, specificAddress, shippingFee, products, userId, imageUrl);
        return response;
    }

    // Calculates shipping date
    calculateShippingDate(): ShippingDate {
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + TIMEZONE_OFFSET); // UTC is now Costa Rican time

        // No shipping on the same day. Deliveries start the next day
        const nextDayOfTheWeek = ((currentTime.getUTCDay() + 1) % 7);

        // Filter out days that have already passed. If there are no days left, start from the beginning of the week
        const deliveryDateOffset = (
            (
                deliveryDays.filter((day) => day >= nextDayOfTheWeek)[0]
                || deliveryDays[0]
            ) - currentTime.getUTCDay() + 7
        ) % 7 || 7; // If the day is the same as the current day, add 7 days, as the delivery service does not work on the same day

        // Calculate the delivery date
        const deliveryDateStart = new Date(Date.UTC(
            currentTime.getUTCFullYear(),
            currentTime.getUTCMonth(),
            currentTime.getUTCDate() + deliveryDateOffset,
            deliveryHours[0] - TIMEZONE_OFFSET,
            0,
            0,
            0
        ));

        const deliveryDateEnd = new Date(deliveryDateStart);
        deliveryDateEnd.setUTCHours(deliveryHours[1] - TIMEZONE_OFFSET);

        return {
            startDateTime: deliveryDateStart,
            endDateTime: deliveryDateEnd
        }
    }
}

