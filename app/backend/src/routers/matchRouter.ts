import { Router } from 'express';
import MatchController from '../database/controllers/match.controller';

const matchRouter = Router();

matchRouter.get('/matches', MatchController.getAllMatchs);

export default matchRouter;
