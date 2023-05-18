import Match from '../models/Match';
import IMatch from '../../interfaces/Match';
import Team from '../models/Team';

export default class MatchService {
  public static async getAllMatches(): Promise<IMatch[]> {
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

  public static async getMatchesByProgress(inProgress: string): Promise<IMatch[]> {
    const convertedInProgress = (inProgress === 'true');
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
      where: { inProgress: convertedInProgress },
    });
    return matches;
  }

  public static async updateMatch(id: number): Promise<void> {
    await Match.update(
      { inProgress: false },
      {
        where: {
          id,
        },
      },
    );
  }
}
