import { Router } from 'express'
import { getDefaultCarts, registerCart, updateCart, deleteCart } from '../controllers/cartItem.controller.js'
const cartRouter = Router();

//?expand === 'product'
cartRouter.route('/').get(getDefaultCarts);
cartRouter.route('/register').post(registerCart);
cartRouter.route('/:productID').put(updateCart);
cartRouter.route('/delete/:productID').delete(deleteCart);
export default cartRouter;

//http://localhost:4000/cart/
//http://localhost:4000/cart/register
//http://localhost:4000/cart/:productID
//http://localhost:4000/car/delete/:productID