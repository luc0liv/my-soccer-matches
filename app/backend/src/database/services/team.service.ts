import Team from '../models/Team';
import ITeam from '../../interfaces/Team';

export default class TeamService {
  public static async getAllTeams(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    return teams;
  }
}
