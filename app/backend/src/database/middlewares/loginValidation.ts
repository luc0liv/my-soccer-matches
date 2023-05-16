import { Request, Response, NextFunction } from 'express';
import statusCodes from '../../utils/statusCodes';
import usersValidation from '../schemas/userSchema';

const dictionary: Record<string, number> = {
  'string.min': statusCodes.unauthorized,
  'string.email': statusCodes.unauthorized,
  'any.required': statusCodes.badRequest,
  'string.empty': statusCodes.badRequest,
};

const checkForMissingFields = (req: Request, res: Response, next: NextFunction) => {
  const { error } = usersValidation(req.body);
  if (error) {
    return res.status(dictionary[error.details[0].type]).json({ message: error.message });
  }

  return next();
};

export default checkForMissingFields;
