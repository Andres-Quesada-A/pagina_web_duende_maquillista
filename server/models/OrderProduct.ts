import { Product } from "./Product";

export class OrderProduct {
    private product: Product;
    private amount: number;
  
    constructor(product: Product, amount: number) {
      this.product = product;
      this.amount = amount;
    }
  
    getProduct(): Product {
      return this.product;
    }
    
    setProduct(product: Product) {
      this.product = product;
    }
  
    getAmount(): number {
      return this.amount;
    }
  
    setAmount(amount: number) {
      this.amount = amount;
    }
  }