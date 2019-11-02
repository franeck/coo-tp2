import {
  Request,
  Response,
  Router,
} from 'express'

import {
  IOrder as Order
} from '../interface/order.interface'

import {
  IOrderService as OrderService
} from "../interface/order.service.interface"

export default class OrdersController {
  public path = '/orders'
  public pathId = '/orders/:id'
  public router = Router()
  private orderService: OrderService; 

  constructor(orderService: OrderService) {
    this.orderService = orderService;
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
    this.orderService.getAll().then((orders) =>{
      response.json(orders)
    })
    .catch(() => {
      response.sendStatus(500)
    })
  }

  public getById = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    this.orderService.find(id).then((order) =>{
      response.json(order)
    })
    .catch(() => {
      response.sendStatus(404)
    })
  }

  public create = async (request: Request, response: Response) => {
    const orderInformation: Order = request.body
    this.orderService.create(orderInformation).then((order) =>{
      response.status(201).json(order)
    })
    .catch(() => {
      response.sendStatus(500)
    })
  }

  public delete = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    this.orderService.delete(id).then(() =>{
      response.sendStatus(204)
    })
    .catch(() => {
      response.sendStatus(404)
    }) 
  }

  public deleteAll = async (request: Request, response: Response) => {
    this.orderService.deleteAll().then(() =>{
      response.sendStatus(204)
    })
    .catch(() => {
      response.sendStatus(500)
    }) 
  }

  public update = async (request: Request, response: Response) => {
    const updateInformation: Order = request.body
    const id = Number(request.params.id)
    this.orderService.update(id, updateInformation).then(() =>{
      response.sendStatus(204)
    })
    .catch(() => {
      response.sendStatus(404)
    }) 
  }
}
