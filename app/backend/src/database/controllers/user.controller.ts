import { Request, Response } from 'express';
import generateToken from '../../utils/jwtToken';
import statusCodes from '../../utils/statusCodes';
import UserService from '../services/user.service';

export default class UserController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(statusCodes.badRequest).json({ message: 'All fields must be filled' });
    }
    const user = await UserService.getUserByEmail(email);
    const token = generateToken(user);
    return res.status(statusCodes.ok).json({ token });
  }
}
