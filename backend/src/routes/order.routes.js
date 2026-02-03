import { Router } from 'express'
import { getOrders, createOrder } from '../controllers/order.controller.js'
const orderRouter = Router();

orderRouter.route('/').get(getOrders);
orderRouter.route('/').post(createOrder);

export default orderRouter;

//http://localhost:4000/order/
//http://localhost:4000/order/