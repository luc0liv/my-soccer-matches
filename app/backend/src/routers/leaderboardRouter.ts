import { Router } from 'express';
import LeaderboardController from '../database/controllers/leaderboard.controller';

const leaderboardRouter = Router();

leaderboardRouter.get('/leaderboard/home', LeaderboardController.getLeaderboard);
leaderboardRouter.get('/leaderboard/away', LeaderboardController.getLeaderboard);

export default leaderboardRouter;
