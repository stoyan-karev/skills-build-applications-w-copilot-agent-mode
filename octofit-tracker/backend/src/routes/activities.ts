import { Router } from 'express';
import { Activity } from '../models';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().lean().exec();
    res.json({ activities });
  } catch (error) {
    next(error);
  }
});

export default router;