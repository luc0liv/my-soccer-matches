import { Router } from 'express';
import validateToken from '../database/middlewares/tokenValidation';
import MatchController from '../database/controllers/match.controller';

const matchRouter = Router();

matchRouter.get('/matches', MatchController.getAllMatchs);
matchRouter.patch('/matches/:id/finish', validateToken, MatchController.updateMatch);

export default matchRouter;
