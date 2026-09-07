import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/guest', AuthController.guestLogin);
router.post('/admin-login', AuthController.adminLogin);
router.post('/admin-demo', AuthController.adminDemoLogin);
router.get('/me', authenticateToken, AuthController.me);

export default router;
