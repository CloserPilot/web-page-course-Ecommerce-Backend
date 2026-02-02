import { Router } from 'express'
import { getDefaulDeliveryOptions } from '../controllers/deliveryOptions.controller.js'
const deliveryRouter = Router();

deliveryRouter.route('/').get(getDefaulDeliveryOptions);
export default deliveryRouter;