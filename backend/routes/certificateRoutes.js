// routes/certificateRoutes.js
import express from 'express';
import { getCertificate } from '../controllers/courseController.js';

const router = express.Router();

// GET /api/certificate?username=...&courseName=...
router.get('/', getCertificate);

export default router;
