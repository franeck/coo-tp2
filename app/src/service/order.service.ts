import { IOrder as Order } from '../interface/order.interface'
import { OrderBuilder } from '../builder/order.builder'
import { IOrderService } from '../interface/order.service.interface'
import { IOrderRepository as OrderRepository } from '../interface/order.repository.interface'

export default class OrderService implements IOrderService {

    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    public async getAll(): Promise<Order[]> {
        return new Promise(async (resolve, reject) => {
            const orders: Order[] = await this.orderRepository.get();

            if(!orders) {
                reject();
            }

            let anonmisedOrders: Order[] = [];

            orders.forEach((order) => {
                anonmisedOrders.push(
                    new OrderBuilder()
                    .setId(order.id)
                    .setCreatedAt(order.createdAt)
                    .setPackages(order.packages)
                    .setFakeContact()
                    .setCarrier(order.carrier)
                    .build()
                );
              });

            resolve(anonmisedOrders);
        })
    }

    public async find(id: number): Promise<Order> {
        return new Promise(async (resolve, reject) => {
            const orders: Order[] = await this.orderRepository.get();
            // tslint:disable-next-line: triple-equals
            const foundOrder: Order = orders.find((order) => order.id === Number(id))   

            if(!foundOrder) {
                reject();
            } else {
                resolve(foundOrder);
            }
        })
    }

    public async create(order: Order): Promise<Order> {
        return new Promise(async (resolve, reject) => {
            const orders: Order[] = await this.orderRepository.get();

            const sortedOrders: Order[] | [] = orders.sort((previous: Order, current: Order) => {
            return current.id - previous.id
            })
            // tslint:disable-next-line: radix
            const lastId: number = sortedOrders.length > 0 ? sortedOrders[0].id : 0

            // Generate automatic data
            const orderToSave: Order = {
            ...order,
            id: lastId + 1,
            createdAt: new Date(),
            }

            const newOrders: Order[] = [...orders, orderToSave]
            await this.orderRepository.set(newOrders)
            
            resolve(orderToSave);
        })
    }

    public async delete(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const orders: Order[] = await this.orderRepository.get();

            // tslint:disable-next-line: triple-equals
            const orderToDelete: Order | null = orders.find((order) => order.id === Number(id))
    
            if (!orderToDelete) {
                reject();
            }
    
            const newOrders: Order[] = orders.filter((order) => order.id !== orderToDelete.id)
            await this.orderRepository.set(newOrders);

            resolve();
        });
    }

    public async deleteAll(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            await this.orderRepository.del();
            resolve();
        });
    }

    public async update(id: number, order: Order): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const orders = await this.orderRepository.get();

            // tslint:disable-next-line: triple-equals
            const orderToUpdate = orders.find((order: Order) => order.id === Number(id))
        
            if (!orderToUpdate) {
                reject();
            }
        
            const updated = {
            ...orderToUpdate,
            ...order,
            }
        
            // tslint:disable-next-line: triple-equals
            const newOrders = orders.map((order: Order) => order.id === updated.id ? updated : order)
        
            await this.orderRepository.set(newOrders);

            resolve();
        });
    }   
}