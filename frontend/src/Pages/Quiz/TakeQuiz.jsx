import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, AlertCircle, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Certificate from "../Certificate";

const QuizApp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");

  const getQuiz = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:3000/api/quiz/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch quiz (${response.status})`);
      }
      const data = await response.json();
      setQuiz(data);
      setTimeLeft(data.timer);
    } catch (error) {
      setError(error.message || "Failed to load quiz");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuiz();
  }, [id]);

  useEffect(() => {
    if (!quizCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setQuizCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, quizCompleted]);

  const handleAnswerSelect = (optionIndex) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = optionIndex;
      return newAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    if (!quiz) return 0;
    return quiz.questions.reduce((score, question, index) => {
      return (
        score + (question.correctAnswer === selectedAnswers[index] ? 1 : 0)
      );
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <AlertCircle className="text-red-500" /> {error}
      </div>
    );
  }

  if (!quiz) return null;

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = (score / quiz.questions.length) * 100;
    return (
      <div className="min-h-screen bg-[#FFFBF5] py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <h1 className="mb-6 text-2xl font-bold text-slate-800">
                  Quiz Results
                </h1>
                <div className="mb-8">
                  <div className="relative mx-auto mb-4 h-40 w-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-slate-800">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                    <svg
                      className="h-full w-full transform -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        className="stroke-current text-slate-200"
                        fill="none"
                        strokeWidth="10"
                        cx="50"
                        cy="50"
                        r="40"
                      />
                      <circle
                        className={`stroke-current ${
                          percentage >= 70 ? "text-green-500" : "text-red-500"
                        }`}
                        fill="none"
                        strokeWidth="10"
                        strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
                        cx="50"
                        cy="50"
                        r="40"
                      />
                    </svg>
                  </div>
                  {percentage >= 70 ? (
                    <div className="space-y-4">
                      <p className="text-lg font-medium text-green-600">
                        Congratulations! You passed the quiz!
                      </p>
                      <p className="text-slate-600">
                        You can now download your certificate of completion.
                      </p>
                      <Link>
                        <Button className="bg-green-600 hover:bg-green-700">
                        <Certificate name={name} course={quiz.title} />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-2 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        <p className="text-lg font-medium">
                          You need 70% or higher to pass the quiz
                        </p>
                      </div>
                      <p className="text-slate-600">
                        Don&apos;t worry! You can review the material and try
                        again.
                      </p>
                      <Button
                        onClick={() => {
                          setIsSubmitted(false);
                          setCurrentQuestion(0);
                          setAnswers({});
                          setTimeLeft(quizData.timeLimit * 60);
                        }}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Retake Quiz
                      </Button>
                    </div>
                  )}
                </div>
                <div className="mt-8 border-t pt-6">
                  <Link href="../learn">
                    <Button variant="outline">Back to Course</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8 bg-[#FFFBF5] h-[80vh]">
      <h1 className="text-3xl font-bold text-slate-800">{quiz.title}</h1>
      <div>
        <h2>
          Question {currentQuestion + 1} of {quiz.questions.length}
        </h2>
        <p className="text-2xl font-bold text-slate-800">
          {quiz.questions[currentQuestion].question}
        </p>
        <div className="flex flex-col gap-y-5 mt-5">
          {quiz.questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`p-2 border rounded w-[80vw] text-left ${
                selectedAnswers[currentQuestion] === index
                  ? "bg-blue-200"
                  : "bg-[#FFFBF5]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <Button
        className="bg-purple-600 hover:bg-purple-700 mt-5"
        onClick={handleNextQuestion}
        disabled={selectedAnswers[currentQuestion] === undefined}
      >
        {currentQuestion === quiz.questions.length - 1
          ? "Finish Quiz"
          : "Next Question"}
      </Button>
    </div>
  );
};

export default QuizApp;
