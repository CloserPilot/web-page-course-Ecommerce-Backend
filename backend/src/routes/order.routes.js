import { Router } from 'express'
import { getOrders, createOrder, getIdOrder } from '../controllers/order.controller.js'
const orderRouter = Router();

orderRouter.route('/').get(getOrders);
orderRouter.route('/').post(createOrder);
orderRouter.route('/:orderID').get(getIdOrder);

export default orderRouter;

//http://localhost:4000/order?expand=product
//http://localhost:4000/order/
//http://localhost:4000/order?expand=product/:orderID