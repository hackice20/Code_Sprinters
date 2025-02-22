import fs from 'fs';
import path from 'path';
import Quiz from '../models/Quiz.js';

const resultsFile = path.join(process.cwd(), 'results.json');

// Initialize the results file if it doesn't exist.
if (!fs.existsSync(resultsFile)) {
  fs.writeFileSync(resultsFile, JSON.stringify([]));
}

/**
 * Append a new test result to the results file.
 * @param {Object} result - The test result object.
 */
export const addTestResult = (result) => {
  try {
    const data = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
    data.push(result);
    fs.writeFileSync(resultsFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error updating results file:', error);
  }
};

/**
 * Retrieve and sort leaderboard data for a given course.
 * Filters to only include passed attempts for quizzes belonging to the course,
 * then sorts by score (desc) and timeTaken (asc).
 * @param {String} courseId - The course identifier.
 * @returns {Array} Sorted leaderboard array.
 */
export const getLeaderboard = async (courseId) => {
  try {
    // Read all stored results.
    const data = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));

    // Retrieve quizzes for the specified course.
    const quizzes = await Quiz.find({ course: courseId }).select('_id');
    const quizIds = quizzes.map((q) => q._id.toString());

    // Filter results: passed attempts and matching quiz IDs.
    const leaderboard = data
      .filter((r) => r.passed && quizIds.includes(r.quizId))
      .sort((a, b) => {
        if (b.score === a.score) {
          return a.timeTaken - b.timeTaken; // lower time wins if scores are equal.
        }
        return b.score - a.score;
      });

    return leaderboard;
  } catch (error) {
    console.error('Error reading results file:', error);
    return [];
  }
};