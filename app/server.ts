import App from './app'
import OrderController from './src/order.controller'

const app = new App([
  new OrderController(),
], 1337)

app.listen()
