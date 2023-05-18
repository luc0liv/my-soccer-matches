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

  static async updateMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MatchService.updateMatch(+id);
      return res.status(statusCodes.ok).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  static async updateMatchInProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      await MatchService.updateMatchInProgress(+id, homeTeamGoals, awayTeamGoals);
      return res.status(statusCodes.ok).json({ message: 'Updated' });
    } catch (error) {
      next(error);
    }
  }

  static async createMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const newMatch = await MatchService.createMatch(req.body);
      return res.status(statusCodes.created).json(newMatch);
    } catch (error) {
      next(error);
    }
  }
}
