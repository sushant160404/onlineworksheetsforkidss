import { Router } from 'express';
import { ProgressController } from '../controllers/progress.controller';

const router = Router();
router.get('/:userId', ProgressController.getProgress);

export default router;
