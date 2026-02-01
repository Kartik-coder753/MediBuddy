import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType: "doctor" | "patient";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, userType }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if user type matches the required user type for this route
  if (currentUser?.userType !== userType) {
    // Redirect to the appropriate dashboard if user type doesn't match
    const redirectPath = currentUser?.userType === "doctor" 
      ? "/doctor-dashboard" 
      : "/patient-dashboard";
    
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;