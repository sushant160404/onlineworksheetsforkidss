import { Router } from 'express';
import { DbController } from '../controllers/db.controller';
import authRoutes from './auth.routes';
import gameRoutes from './game.routes';
import progressRoutes from './progress.routes';
import leaderboardRoutes from './leaderboard.routes';
import worksheetRoutes from './worksheet.routes';
import dbRoutes from './db.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.get('/health', DbController.health);

router.use('/auth', authRoutes);
router.use('/games', gameRoutes);
router.use('/progress', progressRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/worksheets', worksheetRoutes);
router.use('/db', dbRoutes);
router.use('/admin', adminRoutes);

export default router;
