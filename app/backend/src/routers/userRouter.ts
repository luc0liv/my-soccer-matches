import { Router } from 'express';
import checkForMissingFields from '../database/middlewares/loginValidation';
import UserController from '../database/controllers/user.controller';
import validateToken from '../database/middlewares/tokenValidation';

const userRouter = Router();

userRouter.post('/login', checkForMissingFields, UserController.login);
userRouter.get('/login/role', validateToken, UserController.getRole);

export default userRouter;
