import Match from '../models/Match';
import IMatch from '../../interfaces/Match';
import Team from '../models/Team';
import HttpError from '../../utils/httpError';
import statusCodes from '../../utils/statusCodes';

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

  public static async updateMatchInProgress(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await Match.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      {
        where: {
          id,
          inProgress: true,
        },
      },
    );
  }

  public static async checkForInvalidIds(awayTeamId: number, homeTeamId: number): Promise<void> {
    const ids = [awayTeamId, homeTeamId];
    const teams = await Promise.all(ids.map((id) => Team.findByPk(id)));
    if (teams.includes(null)) {
      throw new HttpError(statusCodes.notFound, 'There is no team with such id!');
    }
  }

  public static async createMatch(match: IMatch): Promise<IMatch> {
    const { awayTeamId, homeTeamId } = match;
    if (awayTeamId === homeTeamId) {
      throw new HttpError(
        statusCodes.unprocessableEntity,
        'It is not possible to create a match with two equal teams',
      );
    }

    await this.checkForInvalidIds(awayTeamId, homeTeamId);

    const newMatch = await Match.create({ ...match, inProgress: true });
    return newMatch;
  }
}
