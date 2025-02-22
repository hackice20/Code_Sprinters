// backend/controllers/quizController.js
import Quiz from '../models/Quiz.js';
import Course from '../models/Course.js';
import { addTestResult } from '../utils/resultsHelper.js';

export const createQuiz = async (req, res) => {
  try {
    const { title, course, questions, timer } = req.body;
    if (questions.length !== 10) {
      return res.status(400).json({ message: 'A quiz must have exactly 10 questions' });
    }
    for (let q of questions) {
      if (!q.options || q.options.length !== 4) {
        return res.status(400).json({ message: 'Each question must have exactly 4 options' });
      }
    }
    const courseExists = await Course.findById(course);
    if (!courseExists) return res.status(404).json({ message: 'Associated course not found' });
    
    const newQuiz = new Quiz({ title, course, questions, timer });
    await newQuiz.save();

    courseExists.quiz = newQuiz._id;
    await courseExists.save();
    
    res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz updated successfully', quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const attemptQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    
    const { answers, timeTaken } = req.body; // Expect array of 10 answer indices and timeTaken in seconds
    if (!answers || answers.length !== 10) {
      return res.status(400).json({ message: 'You must provide answers for all 10 questions' });
    }
    if (timeTaken > quiz.timer) {
      return res.status(400).json({ message: 'Time limit exceeded. Quiz attempt failed.' });
    }
    
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        correctCount++;
      }
    });
    
    const scorePercentage = (correctCount / 10) * 100;
    const passed = scorePercentage >= 70;

    const result = {
      userId: req.user.id,                // Assuming req.user is set from auth middleware
      username: req.user.email,           // Or a username field if available
      quizId: req.params.id,
      score: scorePercentage,
      timeTaken,
      passed,
      date: new Date()
    };
    addTestResult(result);
    
    res.json({
      score: scorePercentage,
      passed,
      message: passed ? 'Congratulations, you passed the quiz! Certificate eligible.' : 'Sorry, you did not pass the quiz. Minimum 70% required for certificate.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
