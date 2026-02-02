import { Router } from 'express'
import { getDefaultCarts, registerCart, updateCart } from '../controllers/cartItem.controller.js'
const cartRouter = Router();

//?expand === 'product'
cartRouter.route('/').get(getDefaultCarts);
cartRouter.route('/register').post(registerCart);
cartRouter.route('/:productID').put(updateCart);
export default cartRouter;