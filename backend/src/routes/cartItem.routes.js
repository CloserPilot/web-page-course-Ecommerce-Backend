import { Router } from 'express'
import { getDefaultCarts } from '../controllers/cartItem.controller.js'
const cartRouter = Router();

cartRouter.route('/').get(getDefaultCarts);
export default cartRouter;