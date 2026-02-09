import { Router } from 'express'
import { deleteAll } from '../controllers/global.controller.js'
const globalRouter = Router();

globalRouter.route('/').post(deleteAll)
export default globalRouter;

//http://localhost:4000/api/reset