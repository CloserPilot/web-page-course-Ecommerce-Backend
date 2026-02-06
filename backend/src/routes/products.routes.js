import { Router } from 'express'
import { getProducts } from '../controllers/product.controller.js'
const productRouter = Router();

productRouter.route('/').get(getProducts);
export default productRouter;

//http://localhost:4000/products