// routes/adminRoutes.js
import express from 'express';
import { registerAdmin, loginAdmin, adminDashboard } from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/dashboard', authenticateToken, adminDashboard);

export default router;
