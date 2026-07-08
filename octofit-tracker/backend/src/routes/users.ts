import { Router } from 'express';
import { User } from '../models';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const users = await User.find().lean().exec();
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

export default router;