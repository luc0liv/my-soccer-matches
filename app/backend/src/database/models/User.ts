import { INTEGER, Model, STRING } from 'sequelize';
import sequelize from '.';
import IUser from '../../interfaces/User';

export default class User extends Model implements IUser {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING(30),
      allowNull: false,
    },
    role: {
      type: STRING(30),
      allowNull: false,
    },
    email: {
      type: STRING(30),
      allowNull: false,
    },
    password: {
      type: STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'users',
    timestamps: false,
    underscored: true,
  },
);

User.addScope('withoutPassword', {
  attributes: {
    exclude: ['password'],
  },
});
