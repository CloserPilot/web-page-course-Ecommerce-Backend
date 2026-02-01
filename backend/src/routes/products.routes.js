import { Router } from 'express'
import { getProducts } from '../controllers/product.controllers.js'
const productRouter = Router();

productRouter.route('/').get(getProducts);
export default productRouter;