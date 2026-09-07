import { Router } from 'express';
import { DbController } from '../controllers/db.controller';

const router = Router();
router.get('/status', DbController.status);
router.get('/tables/:name', DbController.tableRows);
router.post('/seed', DbController.seed);

export default router;
