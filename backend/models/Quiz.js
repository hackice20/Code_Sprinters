// backend/models/Quiz.js
import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { 
    type: [String], 
    required: true,
    validate: {
      validator: (arr) => arr.length === 4,
      message: 'Each question must have exactly 4 options'
    }
  },
  correctAnswer: { type: Number, required: true } // index (0-3)
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  questions: { 
    type: [questionSchema],
    required: true,
    validate: {
      validator: (arr) => arr.length === 10,
      message: 'A quiz must have exactly 10 questions'
    }
  },
  timer: { type: Number, required: true } // in seconds
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);
