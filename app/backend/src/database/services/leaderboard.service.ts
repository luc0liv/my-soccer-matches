import sequelize from '../models/index';
import Leaderboard from '../../interfaces/Leaderboard';
import leaderboardHomeQuery from './leaderboardHomeQuery';

export default class LeaderboardService {
  public static async getLeaderboard(): Promise<Leaderboard[]> {
    const [leaderboard] = await sequelize.query(leaderboardHomeQuery);
    return leaderboard as Leaderboard[];
  }
}
