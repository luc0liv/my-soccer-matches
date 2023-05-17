import { Request, Response, NextFunction } from 'express';
import statusCodes from '../../utils/statusCodes';
import MatchService from '../services/match.service';

export default class MatchController {
  static async getAllMatchs(_req: Request, res: Response, next: NextFunction) {
    try {
      const matchs = await MatchService.getAllMatchs();
      return res.status(statusCodes.ok).json(matchs);
    } catch (error) {
      next(error);
    }
  }
}
