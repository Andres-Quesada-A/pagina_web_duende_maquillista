import { Address } from "./Address";
import { STATUSES } from "./STATUSES";
import { ShoppingCart } from "./ShoppingCart";
import { User } from "./User";
import { OrderProduct } from "./OrderProduct";
import { Product } from "./Product";

export class Order {
    private id: number;
    private products: OrderProduct[];
    private timestamp: string;
    private voucherImageUrl: string;
    private client: User;
    private address: Address;
    private status: STATUSES;
  
    constructor(
      id: number,
      products: OrderProduct[],
      timestamp: string,
      voucherImageUrl: string,
      client: User,
      address: Address,
      status: STATUSES
    ) {
      this.id = id;
      this.products = products;
      this.timestamp = timestamp;
      this.voucherImageUrl = voucherImageUrl;
      this.client = client;
      this.address = address;
      this.status = status;
    }
  
    getId(): number {
      return this.id;
    }
  
    setId(id: number) {
      this.id = id;
    }
  
    getProducts(): OrderProduct[] {
      return this.products;
    }
  
    setProducts(products: OrderProduct[]) {
      this.products = products;
    }
  
    getTimestamp(): string {
      return this.timestamp;
    }
  
    setTimestamp(timestamp: string) {
      this.timestamp = timestamp;
    }
  
    getVoucherImageUrl(): string {
      return this.voucherImageUrl;
    }
  
    setVoucherImageUrl(voucherImageUrl: string) {
      this.voucherImageUrl = voucherImageUrl;
    }
  
    getClient(): User {
      return this.client;
    }
  
    setClient(client: User) {
      this.client = client;
    }
  
    getAddress(): Address {
      return this.address;
    }
  
    setAddress(address: Address) {
      this.address = address;
    }
  
    getStatus(): STATUSES {
      return this.status;
    }
  
    setStatus(status: STATUSES) {
      this.status = status;
    }
  }