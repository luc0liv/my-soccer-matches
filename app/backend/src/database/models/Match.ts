import { BOOLEAN, INTEGER, Model } from 'sequelize';
import sequelize from '.';
import IMatch from '../../interfaces/Match';
import Team from './Team';

export default class Match extends Model implements IMatch {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    homeTeamId: {
      type: INTEGER,
    },
    homeTeamGoals: {
      type: INTEGER,
    },
    awayTeamId: {
      type: INTEGER,
    },
    awayTeamGoals: {
      type: INTEGER,
    },
    inProgress: {
      type: BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

Match.belongsTo(
  Team,
  {
    foreignKey: {
      name: 'awayTeamId',
    },
  },
);

Match.belongsTo(
  Team,
  {
    foreignKey: {
      name: 'homeTeamId',
    },
  },
);
