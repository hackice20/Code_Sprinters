import React from "react";
import Navbar from "./components/Common/Navbar";
import Footer from "./components/Common/Footer";
import LandingPage from "./Pages/LandingPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Auth from "./Pages/Auth";
import Certificate from "./Pages/Certificate";
import Dashboard from "./Pages/Dashboard";
import { AuthProvider } from "./context/authContext";
import ExploreCourses from "./Pages/ExploreCourses";
import CoursePage from "./Pages/Course";
import AdminDashboard from "./Pages/Admin/Dashboard";
import CreateCourse from "./Pages/Admin/CreateCourse";
import CourseLearningPage from "./Pages/Course/learn";
import AdminAuth from "./Pages/Admin/Auth";
import CreateQuiz from "./Pages/Admin/CreateQuiz";
import ProtectedRoute from "./components/Common/ProtectedRoutes";
import QuizApp from "./Pages/Quiz/TakeQuiz";
import EnrolledCourses from "./Pages/EnrolledCourse";
import ChatbotPage from "./Pages/ChatBot";
import LeaderBoard from "./Pages/LearderBoard/index";
const App = () => {
  return (
    <Router>
      <div className="">
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exploreCourses" element={<ExploreCourses />} />
            <Route path="/enrolledCourses" element={<EnrolledCourses />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/learn/:id" element={<CourseLearningPage />} />
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/takeQuiz/:id" element={<QuizApp />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/leaderboard" element={<LeaderBoard id={"67b88f2743bae65b585bfed6"} />} />
            {/* Protected Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/createCourse"
              element={
                <ProtectedRoute>
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/:id/createQuiz"
              element={
                <ProtectedRoute>
                  <CreateQuiz />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </AuthProvider>
      </div>
    </Router>
  );
};

export default App;
