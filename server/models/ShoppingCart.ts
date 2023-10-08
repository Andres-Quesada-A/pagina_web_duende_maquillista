import { ShoppingDetail } from "./ShoppingDetail";

export class ShoppingCart {
    private shoppingDetails: ShoppingDetail[] = [];

    addShoppingDetail(shoppingDetail: ShoppingDetail): void {
        this.shoppingDetails.push(shoppingDetail);
    }

    removeShoppingDetail(shoppingDetail: ShoppingDetail): void {
        const index = this.shoppingDetails.indexOf(shoppingDetail);
        if (index !== -1) {
            this.shoppingDetails.splice(index, 1);
        }
    }

    getShoppingDetails(): ShoppingDetail[] {
        return this.shoppingDetails;
    }

    getTotal(): number {
        let total = 0;

        // for (const detail of this.shoppingDetails) {
        //     const product = detail.product;
        //     const amount = detail.amount;
        //     total += product.price * amount;
        // }

        return total;
    }
}