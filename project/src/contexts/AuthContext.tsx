import React, { createContext, useContext, useState, useEffect } from "react";
import { mockUsers } from "../data/mockData";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  userType: "doctor" | "patient";
  profilePicture?: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string, userType: "doctor" | "patient") => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("medibuddy_user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("medibuddy_user");
      }
    }
  }, []);

  const login = (email: string, password: string, userType: "doctor" | "patient"): boolean => {
    // Find user in mock data
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password && u.userType === userType
    );

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("medibuddy_user", JSON.stringify(user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("medibuddy_user");
  };

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};