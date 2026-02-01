import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, UserCircle, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import logo from "../assets/logo.svg";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const getDashboardPath = () => {
    if (!currentUser) return "/login";
    return currentUser.userType === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white dark:bg-gray-900 shadow-md" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-auto sm:h-10"
                src={logo}
                alt="MediBuddy"
              />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
                MEDIBUDDY
              </span>
            </Link>
          </div>
          
          <div className="-mr-2 -my-2 md:hidden flex items-center">
            <button
              onClick={() => toggleDarkMode()}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none mr-2"
            >
              {darkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <nav className="hidden md:flex space-x-10 items-center">
            <Link
              to="/"
              className={`text-base font-medium ${
                location.pathname === "/" 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Home
            </Link>
            
            {currentUser ? (
              <Link
                to={getDashboardPath()}
                className={`text-base font-medium ${
                  location.pathname.includes("dashboard") 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className={`text-base font-medium ${
                  location.pathname === "/login" 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                Login
              </Link>
            )}
          </nav>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button
              onClick={() => toggleDarkMode()}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
            >
              {darkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
            
            {currentUser && (
              <div className="flex items-center ml-4">
                <span className="flex items-center">
                  <UserCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentUser.name}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="ml-4 flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isOpen ? "fixed inset-0 z-50 overflow-hidden" : "hidden"
        }`}
        aria-labelledby="mobile-menu"
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 transition-opacity" />

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white dark:bg-gray-900 shadow-xl overflow-y-auto">
              <div className="px-4 pt-5 pb-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="h-8 w-auto"
                      src={logo}
                      alt="MediBuddy"
                    />
                    <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 text-transparent bg-clip-text">
                      MEDIBUDDY
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
                  >
                    <span className="sr-only">Close panel</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              
              <div className="mt-6 relative flex-1 px-4 sm:px-6">
                <div className="flex flex-col h-full">
                  <div className="space-y-4">
                    <Link
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        location.pathname === "/" 
                          ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400" 
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      Home
                    </Link>
                    
                    {currentUser ? (
                      <Link
                        to={getDashboardPath()}
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname.includes("dashboard") 
                            ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400" 
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          location.pathname === "/login" 
                            ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400" 
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        Login
                      </Link>
                    )}
                  </div>
                  
                  <div className="mt-auto pb-6">
                    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleDarkMode()}
                          className="rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none"
                        >
                          {darkMode ? (
                            <div className="flex items-center">
                              <Sun className="h-5 w-5 mr-2" />
                              <span>Light Mode</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Moon className="h-5 w-5 mr-2" />
                              <span>Dark Mode</span>
                            </div>
                          )}
                        </button>
                      </div>
                      
                      {currentUser && (
                        <button
                          onClick={handleLogout}
                          className="flex items-center text-sm text-red-600 dark:text-red-400"
                        >
                          <LogOut className="h-5 w-5 mr-1" />
                          <span>Logout</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;