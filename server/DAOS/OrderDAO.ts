import { Order } from "../models/Order";
import { OrderProduct } from "../models/OrderProduct";
import { Product } from "../models/Product";
import { STATUSES } from "../models/STATUSES";
import { User } from "../models/User";
import { Address } from "../models/Address";
import ConnectionDAO from "./ConnectionDAO";
import sqlcon from 'mssql';
import { ProductCategory } from "../models/ProductCategory";

export class OrderDAO {

    createOrder(
        province: string,
        canton: string,
        district: string,
        specificAddress: string,
        shippingFee: number,
        products: any[],
        userId: number,
        imageUrl: string
    ): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];
        
        const tvpSchema = new sqlcon.Table('CartTVP');
        tvpSchema.columns.add('productId', sqlcon.Int);
        tvpSchema.columns.add('quantity', sqlcon.Int);

        console.log(products, "here")
        products.forEach((product) => {
            tvpSchema.rows.add(product.id, product.amount);
        });

        return new Promise((resolve, reject) => {
            try {
                SQL.query('Duende_SP_Orders_Add',
                    {
                        'IN_Province': province,
                        'IN_Canton': canton,
                        'IN_District': district,
                        'IN_Address': specificAddress,
                        'IN_ShippingFee': shippingFee,
                        'IN_Products': tvpSchema,
                        'IN_UserID': userId,
                        'IN_VoucherUrl': imageUrl
                    }).then((result) => {
                        resolve(true);
                    }).catch((error) => {
                        //fail in the execution of the query
                        console.log(error, "catch query")
                        damage.push({ customError: error.customError });
                        reject(false);
                    })
            } catch (error) {
                console.log(error, "try catch query")
                // any errors that occur during the process
                reject(damage)
            }
        })

    }

    async editOrder(id: number, status: string): Promise<{userId?:number,success:boolean}> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try { 
                SQL.query('Duende_SP_Orders_Edit',
                    {
                        'IN_OrderID': id,
                        'IN_NewStatus': status
                    }).then((result) => {
                        const response = result?.recordset[0];
                        resolve({userId: response.userId, success: true});
                    }).catch((error) => {
                        //fail in the execution of the query
                        damage.push({ customError: error.customError });
                        reject(damage);
                    })
            } catch (error) {
                // any errors that occur during the process
                reject(damage)
            }
        })
    }

    getOrderDetails(id: number): Promise<Order> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try{
                SQL.query('Duende_SP_Orders_Details', { 'IN_OrderID': id })
                .then((result) => {
                    const order = result?.recordset[0]
                    const address = new Address(
                        order.Province, 
                        order.Canton, 
                        order.District, 
                        order.Address, 
                        order.ShippingFee
                    );

                    const client = new User(
                        order.UserID,
                        order.UserName,
                        order.UserLastname1,
                        order.UserLastname2,
                        order.UserEmail,
                        order.UserPassword,
                        order.UserToken
                    );
                    
                    const products = JSON.parse(order['Products']).map((product:any) => {
                            return  new OrderProduct
                            (
                            new Product(
                                product.id, 
                                product.name,
                                product.description, 
                                new ProductCategory(product.category),
                                product.imageUrl,
                                product.price,
                                product.weight,
                                product.available
                            ),
                            product.amount
                        );
                    });

                    const orderObj = new Order(
                        order.OrderID,
                        products,
                        order.timestamp,
                        order.voucherImageUrl,
                        client,
                        address,
                        STATUSES[order.OrderStatus as keyof typeof STATUSES],
                        order.DeliveryDate
                    );
                    resolve(orderObj);
                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(damage);
                })
            } catch(error) {
                // any errors that occur during the process
                reject(damage);
            }
        });
    }

    async getOrderList(email?: string): Promise<Order[]> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try{
                SQL.query('Duende_SP_Orders_List', { 'IN_userEmail': email })
                .then((result) => {
                    const orderlist = result?.recordset.map(
                        (order: any) =>{ 
                        const address = new Address(
                            order.Province, 
                            order.Canton, 
                            order.District, 
                            order.Address, 
                            order.ShippingFee
                        );
    
                        const client = new User(
                            order.UserID,
                            order.UserName,
                            order.UserLastname1,
                            order.UserLastname2,
                            order.UserEmail,
                            order.UserPassword,
                            order.UserToken
                        );
                        
                        const products = JSON.parse(order['Products']).map((product:any) => {
                                return  new OrderProduct
                                (
                                new Product(
                                    product.id, 
                                    product.name,
                                    product.description, 
                                    new ProductCategory(product.category),
                                    product.imageUrl,
                                    product.price,
                                    product.weight,
                                    product.available
                                ),
                                product.amount
                            );
                        });
    
                        const orderObj = new Order(
                            order.OrderID,
                            products,
                            order.timestamp,
                            order.voucherImageUrl,
                            client,
                            address,
                            STATUSES[order.OrderStatus as keyof typeof STATUSES]
                        );
                        return orderObj;
                    }
                    )
                    resolve(orderlist);
                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(damage);
                })
            } catch(error) {
                // any errors that occur during the process
                reject(damage);
            }
        });
    }

    async deleteOrder(id: number): Promise<boolean> {
        const SQL = ConnectionDAO.getInstance();
        const damage: { customError: string | undefined }[] = [];

        return new Promise((resolve, reject) => {
            try{
                SQL.query('Duende_SP_Orders_Delete', { 'IN_OrderID': id })
                .then((result) => {
                    resolve(true);
                }).catch((error) => {
                    //fail in the execution of the query
                    damage.push({ customError: error.customError });
                    reject(false);
                })
            } catch(error) {
                // any errors that occur during the process
                reject(damage);
            }
        });
    }
}