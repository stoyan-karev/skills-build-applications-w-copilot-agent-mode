import { Router } from 'express';
import { Workout } from '../models';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().lean().exec();
    res.json({ workouts });
  } catch (error) {
    next(error);
  }
});

export default router;