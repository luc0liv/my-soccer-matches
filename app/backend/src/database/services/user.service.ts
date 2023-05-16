import * as bcrypt from 'bcryptjs';
import User from '../models/User';
import statusCodes from '../../utils/statusCodes';
import generateToken from '../../utils/jwtToken';
import HttpError from '../../utils/httpError';

export interface ErrorMessage { message: string, status: number }
export default class UserService {
  static async getUserByEmail(
    email: string,
    password: string,
  ): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new HttpError(statusCodes.unauthorized, 'Invalid email or password');
    }
    const passwordDecrypted = await bcrypt.compare(password, user.password);
    if (!passwordDecrypted) {
      throw new HttpError(statusCodes.unauthorized, 'Invalid email or password');
    }
    const token = generateToken(user);
    return token;
  }

  static async getUserRole(email: string): Promise<string | undefined> {
    const user = await User.findOne({ where: { email } });
    return user?.role;
  }
}
