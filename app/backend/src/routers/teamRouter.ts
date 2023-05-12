import { Router } from 'express';
import TeamController from '../database/controllers/team.controller';

const teamRouter = Router();

teamRouter.get('/teams', TeamController.getAllTeams);

export default teamRouter;
