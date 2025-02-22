// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, userDashboard } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/dashboard', authenticateToken, userDashboard);

export default router;
