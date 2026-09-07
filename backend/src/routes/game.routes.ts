import { Router } from 'express';
import { GameController } from '../controllers/game.controller';

const router = Router();
router.post('/record', GameController.record);

export default router;
