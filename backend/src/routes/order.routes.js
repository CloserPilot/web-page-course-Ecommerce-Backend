import { Router } from 'express'
import { getOrders } from '../controllers/order.controller.js'
const orderRouter = Router();

orderRouter.route('/').get(getOrders);
export default orderRouter;

//http://localhost:4000/order/