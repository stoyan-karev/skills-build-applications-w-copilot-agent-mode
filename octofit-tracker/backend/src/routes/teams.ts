import { Router } from 'express';
import { Team } from '../models';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const teams = await Team.find().lean().exec();
    res.json({ teams });
  } catch (error) {
    next(error);
  }
});

export default router;