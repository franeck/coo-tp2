import {IOrder as Order} from "./order.interface";

export interface IOrderRepository {
    get(): Promise<Order[]>;
    set(orders: Order[]): Promise<void>;
    del(): Promise<void>;
}