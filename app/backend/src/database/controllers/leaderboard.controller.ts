import { Request, Response, NextFunction } from 'express';
import statusCodes from '../../utils/statusCodes';
import LeaderboardService from '../services/leaderboard.service';
import leaderboardAwayQuery from '../../utils/leaderboardAwayQuery';
import leaderboardHomeQuery from '../../utils/leaderboardHomeQuery';

export default class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      let query;
      if (req.path.includes('home')) {
        query = leaderboardHomeQuery;
      } else {
        query = leaderboardAwayQuery;
      }
      const leaderboard = await LeaderboardService.getLeaderboard(query);
      return res.status(statusCodes.ok).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }
}
