import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';

const router = Router();

router.get('/stats', AdminController.getStats);

router.get('/users', AdminController.getUsers);
router.put('/users/:id', AdminController.updateUser);
router.delete('/users/:id', AdminController.deleteUser);

router.get('/sessions', AdminController.getSessions);
router.delete('/sessions/:id', AdminController.deleteSession);

router.get('/worksheets', AdminController.getWorksheets);
router.post('/worksheets', AdminController.createWorksheet);
router.put('/worksheets/:id', AdminController.updateWorksheet);
router.delete('/worksheets/:id', AdminController.deleteWorksheet);

router.get('/tables', AdminController.getTables);
router.post('/tables/create', AdminController.createTable);
router.post('/tables/:name/rows', AdminController.insertRow);
router.delete('/tables/:name/rows/:id', AdminController.deleteRow);

export default router;
