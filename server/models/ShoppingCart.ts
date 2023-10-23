import { OrderProduct } from "./OrderProduct";

export class ShoppingCart {
    private orderProducts: OrderProduct[] = [];

    addShoppingDetail(orderProduct: OrderProduct): void {
        this.orderProducts.push(orderProduct);
    }

    removeOrderProduct(orderProduct: OrderProduct): void {
        const index = this.orderProducts.indexOf(orderProduct);
        if (index !== -1) {
            this.orderProducts.splice(index, 1);
        }
    }

    getOrderProducts(): OrderProduct[] {
        return this.orderProducts;
    }

    getTotal(): number {
        let total = 0;

        // for (const detail of this.orderProducts) {
        //     const product = detail.product;
        //     const amount = detail.amount;
        //     total += product.price * amount;
        // }

        return total;
    }
}