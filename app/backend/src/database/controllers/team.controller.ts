import { Request, Response } from 'express';
import statusCodes from '../../utils/statusCodes';
import TeamService from '../services/team.service';

export default class TeamController {
  static async getAllTeams(_req: Request, res: Response): Promise<void> {
    const teams = await TeamService.getAllTeams();
    res.status(statusCodes.ok).json(teams);
  }
}
