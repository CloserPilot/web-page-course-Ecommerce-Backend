import { Router } from 'express'
import { registerUser, getUsers } from '../controllers/user.controllers.js'
const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/All').get(getUsers);
export default userRouter;