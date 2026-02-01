import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Calendar, Users, User, FileText, BarChart2, Settings, Bell, Menu, X, Activity, TrendingUp, UserCheck, Clock, FileBadge as FileBar, BarChart as ChartBar, Settings2, BookOpen } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import DoctorProfile from "../components/doctor/DoctorProfile";
import DoctorAppointments from "../components/doctor/DoctorAppointments";
import DoctorPatients from "../components/doctor/DoctorPatients";
import DoctorPatientDetails from "../components/doctor/DoctorPatientDetails";
import DoctorAnalytics from "../components/doctor/DoctorAnalytics";
import DoctorReports from "../components/doctor/DoctorReports";
import DoctorSettings from "../components/doctor/DoctorSettings";

const DoctorDashboard = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  if (!currentUser || currentUser.userType !== "doctor") {
    return null;
  }

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-blue-600 rounded-full text-white shadow-lg"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg">
                MD
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
                MediBuddy
              </span>
            </div>
            <div className="mt-8">
              <div className="flex items-center">
                <img
                  src={currentUser.profilePicture || "https://via.placeholder.com/150"}
                  alt={currentUser.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Doctor</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-3 space-y-1">
              <Link
                to="/doctor-dashboard"
                className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActivePath("/doctor-dashboard") && !isActivePath("/doctor-dashboard/appointments") && 
                  !isActivePath("/doctor-dashboard/patients") && !isActivePath("/doctor-dashboard/analytics") &&
                  !isActivePath("/doctor-dashboard/reports") && !isActivePath("/doctor-dashboard/settings")
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </Link>
              
              <Link
                to="/doctor-dashboard/appointments"
                className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActivePath("/doctor-dashboard/appointments")
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Calendar className="mr-3 h-5 w-5" />
                Appointments
              </Link>
              
              <Link
                to="/doctor-dashboard/patients"
                className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActivePath("/doctor-dashboard/patients")
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Users className="mr-3 h-5 w-5" />
                Patients
              </Link>
              
              <Link
                to="/doctor-dashboard/analytics"
                className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActivePath("/doctor-dashboard/analytics")
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <BarChart2 className="mr-3 h-5 w-5" />
                Analytics
              </Link>
              
              <Link
                to="/doctor-dashboard/reports"
                className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActivePath("/doctor-dashboard/reports")
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <FileText className="mr-3 h-5 w-5" />
                Reports
              </Link>
              
              <Link
                to="/doctor-dashboard/settings"
                className={`group flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActivePath("/doctor-dashboard/settings")
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
              <Routes>
                <Route index element={<DoctorProfile />} />
                <Route path="appointments" element={<DoctorAppointments />} />
                <Route path="patients" element={<DoctorPatients />} />
                <Route path="patients/:patientId" element={<DoctorPatientDetails />} />
                <Route path="analytics" element={<DoctorAnalytics />} />
                <Route path="reports" element={<DoctorReports />} />
                <Route path="settings" element={<DoctorSettings />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;