import { Request, Response, NextFunction } from 'express';
import statusCodes from '../../utils/statusCodes';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboard = await LeaderboardService.getLeaderboard(req.path);
      return res.status(statusCodes.ok).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }
}
