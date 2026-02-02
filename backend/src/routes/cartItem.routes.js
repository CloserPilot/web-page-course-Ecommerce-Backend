import { Router } from 'express'
import { getDefaultCarts, registerCart } from '../controllers/cartItem.controller.js'
const cartRouter = Router();

cartRouter.route('/').get(getDefaultCarts);
cartRouter.route('/register').post(registerCart);
export default cartRouter;