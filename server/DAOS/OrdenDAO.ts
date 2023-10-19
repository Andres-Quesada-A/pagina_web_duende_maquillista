import { Order } from "../models/Order";
import { Product } from "../models/Product";

export class OrdenDAO {

    createOrder(
        province: string,
        canton: string,
        district: string,
        specificAddress: string,
        products: Product[],
        imageUrl: string
    ): boolean {
        return true
    }

    editOrder(id: number, status: string): boolean {
        return false;
    }

    getOrderDetails(id: number): Order | undefined {
        return 
    }

    getOrderList(): Order[] {
        return []
    }

    deleteOrder(id: number): boolean {
        return false;
    }
}