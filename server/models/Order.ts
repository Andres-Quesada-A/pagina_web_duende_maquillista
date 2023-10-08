import { Address } from "./Address";
import { STATES } from "./STATES";
import { ShoppingCart } from "./ShoppingCart";
import { User } from "./User";

export class Order {
    private id: number;
    private cart: ShoppingCart;
    private timestamp: string;
    private voucherImageUrl: string;
    private client: User;
    private address: Address;
    private state: STATES;
  
    constructor(
      id: number,
      cart: ShoppingCart,
      timestamp: string,
      voucherImageUrl: string,
      client: User,
      address: Address,
      state: STATES
    ) {
      this.id = id;
      this.cart = cart;
      this.timestamp = timestamp;
      this.voucherImageUrl = voucherImageUrl;
      this.client = client;
      this.address = address;
      this.state = state;
    }
  
    getId(): number {
      return this.id;
    }
  
    setId(id: number) {
      this.id = id;
    }
  
    getCart(): ShoppingCart {
      return this.cart;
    }
  
    setCart(cart: ShoppingCart) {
      this.cart = cart;
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
  
    getState(): STATES {
      return this.state;
    }
  
    setState(state: STATES) {
      this.state = state;
    }
  }