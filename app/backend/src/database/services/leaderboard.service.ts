import sequelize from '../models/index';
import Leaderboard from '../../interfaces/Leaderboard';
import leaderboardAwayQuery from '../../utils/leaderboardAwayQuery';
import leaderboardHomeQuery from '../../utils/leaderboardHomeQuery';

export default class LeaderboardService {
  public static async getLeaderboard(path: string): Promise<Leaderboard[]> {
    let query = '';
    if (path.includes('home')) {
      query = leaderboardHomeQuery;
    }
    if (path.includes('away')) {
      query = leaderboardAwayQuery;
    }
    const [leaderboard] = await sequelize.query(query);
    return leaderboard as Leaderboard[];
  }
}
