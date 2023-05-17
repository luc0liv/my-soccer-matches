import { Request, Response, NextFunction } from 'express';
import statusCodes from '../../utils/statusCodes';
import MatchService from '../services/match.service';

export default class MatchController {
  static async getAllMatchs(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const filteredMatches = await MatchService.getMatchesByProgress(inProgress as string);
        return res.status(statusCodes.ok).json(filteredMatches);
      }
      const matches = await MatchService.getAllMatches();
      return res.status(statusCodes.ok).json(matches);
    } catch (error) {
      next(error);
    }
  }
}
