import { Router } from 'express';
import UserController from '../database/controllers/user.controller';

const userRouter = Router();

userRouter.post('/login', UserController.login);

export default userRouter;
