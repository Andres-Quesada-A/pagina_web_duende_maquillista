import { Order } from "../models/Order";
import { OrderProduct } from "../models/OrderProduct";
import ConnectionDAO from "./ConnectionDAO";
import sqlcon from 'mssql';

export class OrderDAO {

    createOrder(
        province: string,
        canton: string,
        district: string,
        specificAddress: string,
        shippingFee: number,
        products: OrderProduct[],
        userId: number,
        imageUrl: string
    ): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { message: string | undefined }[] = [];
        
        const tvpSchema = new sqlcon.Table('CartTVP');
        tvpSchema.columns.add('productId', sqlcon.Int);
        tvpSchema.columns.add('quantity', sqlcon.Int);

        products.forEach((product) => {
            tvpSchema.rows.add(product.getProduct().getId(), product.getAmount());
        });

        return new Promise((resolve, reject) => {
            try {
                SQL.query('Duende_SP_Orders_Add',
                    {
                        'IN_Province': province,
                        'IN_Canton': canton,
                        'IN_District': district,
                        'IN_SpecificAddress': specificAddress,
                        'IN_ShippingFee': shippingFee,
                        'IN_Cart': tvpSchema,
                        'IN_UserID': userId,
                        'IN_VoucherUrl': imageUrl
                    }).then((result) => {
                        resolve(true);
                    }).catch((error) => {
                        //fail in the execution of the query
                        damage.push({ message: String(error.message) });
                        reject(false);
                    })
            } catch (error) {
                // any errors that occur during the process
                damage.push({ message: undefined })
                reject(damage)
            }
        })

    }

    async editOrder(id: number, status: string): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { message: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try {
                SQL.query('Duende_SP_Orders_Edit',
                    {
                        'IN_OrderID': id,
                        'IN_NewStatus': status
                    }).then((result) => {
                        resolve(true);
                    }).catch((error) => {
                        //fail in the execution of the query
                        damage.push({ message: String(error.message) });
                        reject(false);
                    })
            } catch (error) {
                // any errors that occur during the process
                damage.push({ message: undefined })
                reject(damage)
            }
        })
    }

    getOrderDetails(id: number): Promise<Order> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { message: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try{
                SQL.query('Duende_SP_Orders_Details', { 'IN_OrderID': id })
                .then((result) => {
                    const order = result?.recordset.map[0]
                    const orderObj = 
                        new Order(
                            order.id,
                            order.cart,
                            order.timestamp,
                            order.voucherImageUrl,
                            order.client,
                            order.address,
                            order.state
                        )
                    resolve(orderObj);
                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ message: String(error.message) });
                    reject(damage);
                })
            } catch(error) {
                // any errors that occur during the process
                damage.push({ message: undefined })
                reject(damage);
            }
        });
    }

    async getOrderList(): Promise<Order[]> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { message: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try{
                SQL.query('Duende_SP_Orders_List')
                .then((result) => {
                    const orderlist = result?.recordset.map(
                        (order: any) => 
                        new Order(
                            order.id,
                            order.cart,
                            order.timestamp,
                            order.voucherImageUrl,
                            order.client,
                            order.address,
                            order.state
                        )
                    )
                    resolve(orderlist);
                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ message: String(error.message) });
                    reject(damage);
                })
            } catch(error) {
                // any errors that occur during the process
                damage.push({ message: undefined })
                reject(damage);
            }
        });
    }

    async deleteOrder(id: number): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { message: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try{
                SQL.query('Duende_SP_Orders_Delete', { 'IN_OrderID': id })
                .then((result) => {
                    resolve(true);
                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ message: String(error.message) });
                    reject(false);
                })
            } catch(error) {
                // any errors that occur during the process
                damage.push({ message: undefined })
                reject(damage);
            }
        });
    }
}