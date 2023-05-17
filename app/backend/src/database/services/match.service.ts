import Match from '../models/Match';
import IMatch from '../../interfaces/Match';
import Team from '../models/Team';

export default class MatchService {
  public static async getAllMatchs(): Promise<IMatch[]> {
    const matches = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }
}
