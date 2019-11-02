import {IOrder as Order} from "./order.interface";

export interface IOrderService {
    getAll(): Promise<Order[]>;
    find(id: number): Promise<Order>;
    create(order: Order): Promise<Order>;
    delete(id: number): Promise<void>;
    deleteAll(): Promise<void>;
    update(id: number, order: Order): Promise<void>;
}