import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/User';

const generateToken = (user: IUser): string => {
  const secret: jwt.Secret = process.env.JWT_SECRET || 'LULUZINHA';
  const jwtConfig: jwt.SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);
  return token;
};

export default generateToken;
