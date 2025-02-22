// routes/courseRoutes.js
import express from 'express';



import { createCourse, getCourses, getCourseById, updateCourse, deleteCourse, purchaseCourse, rateCourse, giveReview, getCoursesByUser } from '../controllers/courseController.js';

import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';
import upload, { handleMulterError } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get("/enrolledCourses", authenticateToken, getCoursesByUser);
router.get('/:id', getCourseById);

// User routes
router.post('/:id/purchase', authenticateToken, purchaseCourse);
router.post('/:id/rate', authenticateToken, rateCourse);
router.post('/:id/review', authenticateToken, giveReview);

// Admin-only routes 
router.post(
  '/',
  authenticateToken,
  isAdmin,
  upload.single('video'), 
  handleMulterError, 
  createCourse
);

router.put(
  '/:id',
  authenticateToken,
  isAdmin,
  upload.single('video'), 
  handleMulterError, 
  updateCourse
);

router.delete('/:id', authenticateToken, isAdmin, deleteCourse);

export default router;