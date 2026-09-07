import { Router } from 'express';
import { WorksheetController } from '../controllers/worksheet.controller';

const router = Router();
router.get('/', WorksheetController.getPublic);

export default router;
