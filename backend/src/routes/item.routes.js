import { Router } from 'express'
import { registerItem,   getItems } from '../controllers/item.controllers.js'
const itemRouter = Router();

itemRouter.route('/register').post(registerItem);
itemRouter.route('/All').get(getItems);
export default itemRouter;