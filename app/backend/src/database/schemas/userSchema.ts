import * as Joi from 'joi';
import IUser from '../../interfaces/User';

const userSchema = Joi.object({
  email: Joi.string().required().email().label('email'),
  password: Joi.string().min(6).required().label('password'),
}).messages({
  'string.email': 'Invalid email or password',
  'string.min': 'Invalid email or password',
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
});

const usersValidation = (user: IUser) => userSchema.validate(user);

export default usersValidation;
