import express from 'express';
import { 
  createCourse, 
  getCourses, 
  getCourseById, 
  updateCourse, 
  deleteCourse, 
  purchaseCourse, 
  rateCourse, 
  giveReview, 
  getCoursesByUser 
} from '../controllers/courseController.js';
import { authenticateToken, isAdmin } from '../middleware/authMiddleware.js';
import  { handleMulterError, uploadFields } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourseById);

// User routes
router.post('/:id/purchase', authenticateToken, purchaseCourse);
router.post('/:id/rate', authenticateToken, rateCourse);
router.post('/:id/review', authenticateToken, giveReview);
router.get("/enrolledCourses", authenticateToken, getCoursesByUser);

// Admin-only routes 
router.post(
  '/',
  authenticateToken,
  isAdmin,
  uploadFields, // Using the new uploadFields middleware for both video and thumbnail
  handleMulterError,
  createCourse
);

router.put(
  '/:id',
  authenticateToken,
  isAdmin,
  uploadFields, // Using the new uploadFields middleware for both video and thumbnail
  handleMulterError,
  updateCourse
);

router.delete('/:id', authenticateToken, isAdmin, deleteCourse);

export default router;