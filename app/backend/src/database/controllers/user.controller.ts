import { Request, Response, NextFunction } from 'express';
// import IUser from '../../interfaces/User';
// import generateToken from '../../utils/jwtToken';
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
}
