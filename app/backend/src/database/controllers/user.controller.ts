import { Request, Response, NextFunction } from 'express';
import UserRequest from '../../interfaces/UserRequest';
import statusCodes from '../../utils/statusCodes';
import UserService from '../services/user.service';

export default class UserController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await UserService.getUserByEmail(email, password);
      return res.status(statusCodes.ok).json({ token });
    } catch (error) {
      next(error);
    }
  }

  static async getRole(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const email = req.user as string;
      const role = await UserService.getUserRole(email);
      return res.status(statusCodes.ok).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
