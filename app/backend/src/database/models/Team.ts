import { INTEGER, Model, STRING } from 'sequelize';
import ITeam from '../../interfaces/Team';
import sequelize from '.';
import Match from './Match';

export default class Team extends Model implements ITeam {
  declare id: number;
  declare teamName: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

Team.hasMany(
  Match,
  {
    foreignKey: {
      name: 'homeTeamId',
    },
  },
);

Team.hasMany(
  Match,
  {
    foreignKey: {
      name: 'awayTeamId',
    },
  },
);
