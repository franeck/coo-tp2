import App from './app'
import OrderController from './src/controller/order.controller'
import OrderService from './src/service/order.service'
import orderRepository from './src/repository/order.repository'

const orderService = new OrderService(orderRepository);

const app = new App([
  new OrderController(orderService),
], 1337)

app.listen()
