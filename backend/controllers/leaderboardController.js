import { getLeaderboard } from '../utils/resultsHelper.js';


export const getLeaderboardController = async (req, res) => {
  try {
    const { courseId } = req.params;
    const leaderboard = await getLeaderboard(courseId);
    res.json(leaderboard);
  } catch (error) {
    console.error('Error retrieving leaderboard:', error);
    res.status(500).json({ message: 'Error retrieving leaderboard' });
  }
};
