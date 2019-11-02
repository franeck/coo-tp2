/* tslint:disable no-console */
import { RedisClient, createClient, print } from 'redis'
import {IOrder as Order} from "../interface/order.interface";
import {IOrderRepository} from '../interface/order.repository.interface'
// NOTE: Promisification - conversion of a function that accepts a callback into a function returning a promise.
import { promisify } from 'util'

class OrderRepository implements IOrderRepository {

    private client: RedisClient;
    private key: string = "orders";
    private getAsync: any;
    private setAsync: any;
    private delAsync: any;

    constructor() {
        this.client = createClient(6379, 'redis');
        this.client.on('connect', () => {
            console.log('Connected to Redis')
        })
        this.client.on('error', (err) => {
        console.error(`Something went wrong with Redis: ${err}`)
        })
        this.getAsync = promisify(this.client.get).bind(this.client)
        this.setAsync = promisify(this.client.set).bind(this.client)
        this.delAsync = promisify(this.client.del).bind(this.client)
    }

    get(): Promise<Order[]> {
        return new Promise((resolve, reject) => {
            this.getAsync(this.key).then((result: string) => {
                const orders: Order[] | [] = JSON.parse(result) || []
                resolve(orders);
            })
            .catch((error: Error) => {
                reject(error);
            })
        });
    }

    set(orders: Order[]): Promise<void> {
        return this.setAsync(this.key, JSON.stringify(orders));
    }

    del(): Promise<void> {
        return this.delAsync(this.key);
    }
}

const orderRepository = new OrderRepository();
export default orderRepository;