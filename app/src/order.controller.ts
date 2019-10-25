import {
  Request,
  Response,
  Router,
} from 'express'

import {
  delAsync,
  getAsync,
  setAsync,
} from '../utils/storage'

export default class OrdersController {
  public path = '/orders'
  public pathId = '/orders/:id'
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAll)
    this.router.get(this.pathId, this.getById)
    this.router.post(this.path, this.create)
    this.router.delete(this.path, this.deleteAll)
    this.router.delete(this.pathId, this.delete)
    this.router.put(this.pathId, this.update)
  }

  public getAll = async (request: Request, response: Response) => {
    const raw: string = await getAsync('orders')
    const orders: any[] | [] = JSON.parse(raw) || []
    response.json(orders)
  }

  public getById = async (request: Request, response: Response) => {
    const id = request.params.id

    const rawOrders: string = await getAsync('orders')
    const orders: any[] | [] = JSON.parse(rawOrders) || []

    // tslint:disable-next-line: triple-equals
    const foundOrder: any = orders.find((order) => order.id == id)

    if (!foundOrder) {
      return response.sendStatus(404)
    }

    response.json(foundOrder)
  }

  public create = async (request: Request, response: Response) => {
    const orderInformations: any = request.body
    const rawOrders: string = await getAsync('orders')
    const orders: any[] | [] = JSON.parse(rawOrders) || []

    const sortedOrders: any[] | [] = orders.sort((previous: any, current: any) => {
      return current.id - previous.id
    })
    // tslint:disable-next-line: radix
    const lastId: number = sortedOrders.length > 0 ? parseInt(sortedOrders[0].id) : 0

    // Generate automatic data
    const orderToSave: any = {
      ...orderInformations,
      id: lastId + 1,
      createdAt: new Date(),
    }

    const newOrders: any[] = [...orders, orderToSave]
    await setAsync('orders', JSON.stringify(newOrders))

    response.status(201).json(orderToSave)
  }

  public delete = async (request: Request, response: Response) => {
    const id = request.params.id

    const rawOrders: string = await getAsync('orders')
    const orders: any[] | [] = JSON.parse(rawOrders) || []
    // tslint:disable-next-line: triple-equals
    const orderToDelete: any | null = orders.find((order) => order.id == id)

    if (!orderToDelete) {
      return response.sendStatus(404)
    }

    const newOrders: any[] = orders.filter((order) => order.id !== orderToDelete.id)
    await setAsync('orders', JSON.stringify(newOrders))

    response.sendStatus(204)
  }

  public deleteAll = async (request: Request, response: Response) => {
    await delAsync('orders')
    response.sendStatus(204)
  }

  public update = async (request: Request, response: Response) => {
    const updateInformations: any = request.body
    const id = request.params.id

    const rawOrders: string = await getAsync('orders')
    const orders = JSON.parse(rawOrders) || []
    // tslint:disable-next-line: triple-equals
    const orderToUpdate = orders.find((order: any) => order.id == id)

    if (!orderToUpdate) {
      return response.sendStatus(404)
    }

    const updated = {
      ...orderToUpdate,
      ...updateInformations,
    }

    // tslint:disable-next-line: triple-equals
    const newOrders = orders.map((order: any) => order.id == updated.id ? updated : order)

    await setAsync('orders', JSON.stringify(newOrders))

    response.sendStatus(204)
  }
}
