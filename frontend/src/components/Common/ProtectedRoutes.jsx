import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/auth" />;
  }

  if (user.role !== "admin") {
    // If the user is not an admin, redirect to the dashboard or any other page
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
