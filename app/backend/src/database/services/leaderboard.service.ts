import sequelize from '../models/index';
import Leaderboard from '../../interfaces/Leaderboard';

export default class LeaderboardService {
  public static async getLeaderboard(query:string): Promise<Leaderboard[]> {
    const [leaderboard] = await sequelize.query(query);
    return leaderboard as Leaderboard[];
  }
}
