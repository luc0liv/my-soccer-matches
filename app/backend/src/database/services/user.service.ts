import User from '../models/User';
import IUser from '../../interfaces/User';

export default class UserService {
  static async getUserByEmail(email: string): Promise<IUser> {
    const [user] = await User.findAll({ where: { email } });
    return user as IUser;
  }
}
