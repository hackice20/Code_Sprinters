import express from 'express';
import { getLeaderboardController } from '../controllers/leaderboardController.js';

const router = express.Router();

router.get('/', getLeaderboardController);
// Updated route to include courseId as a route parameter.
router.get('/:courseId', getLeaderboardController);

export default router;
