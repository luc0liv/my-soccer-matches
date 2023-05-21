import { Router } from 'express';
import LeaderboardController from '../database/controllers/leaderboard.controller';

const leaderboardRouter = Router();

leaderboardRouter.get('/leaderboard/home', LeaderboardController.getLeaderboard);

export default leaderboardRouter;
