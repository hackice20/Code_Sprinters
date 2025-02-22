// backend/routes/quizRoutes.js
import express from 'express';
import { createQuiz, getQuiz, updateQuiz, deleteQuiz, attemptQuiz } from '../controllers/quizController.js';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Get quiz details and attempt quiz
router.get('/:id', getQuiz);
router.post('/:id/attempt', authenticateToken, attemptQuiz);

// Admin-only: Manage quizzes
router.post('/', authenticateToken, isAdmin, createQuiz);
router.put('/:id', authenticateToken, isAdmin, updateQuiz);
router.delete('/:id', authenticateToken, isAdmin, deleteQuiz);

export default router;
