import { OrderDAO} from "../DAOS/OrderDAO";
import { Order } from "../models/Order";
import { OrderProduct } from "../models/OrderProduct";

export class OrderController {
    private OrderDAO: OrderDAO;
    constructor() {
        this.OrderDAO = new OrderDAO();
    }

    // edits the status of an order
    async editOrder(id: number, status: string): Promise<boolean> {
        const response = await this.OrderDAO.editOrder(id, status);
        return response;
    }

    // gets the list of orders
    async getOrderList(): Promise<Order[]> {
        const response = await this.OrderDAO.getOrderList();
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
        products: OrderProduct[],
        userId: number,
        imageUrl: string): Promise<boolean> {
        const response = await this.OrderDAO.createOrder(province, canton, district, specificAddress, shippingFee, products, userId, imageUrl);
        return response;
    }
}

