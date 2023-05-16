import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserRequest from '../../interfaces/UserRequest';

const secret: jwt.Secret = process.env.JWT_SECRET || 'LULUZINHA';

const validateToken = (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const decodeToken = jwt.verify(token, secret);
    if (decodeToken) {
      req.user = decodeToken as string;
    }

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
