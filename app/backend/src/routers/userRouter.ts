import { Router } from 'express';
import checkForMissingFields from '../database/middlewares/loginValidation';
import UserController from '../database/controllers/user.controller';

const userRouter = Router();

userRouter.post('/login', checkForMissingFields, UserController.login);

export default userRouter;
