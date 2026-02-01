import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, MessageSquare, CheckCircle, XCircle, AlertCircle, Search, PlusCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { mockAppointments } from "../../data/mockData";

type AppointmentStatus = "all" | "confirmed" | "pending" | "completed";

const PatientAppointments = () => {
  const { currentUser } = useAuth();
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  if (!currentUser || currentUser.userType !== "patient") {
    return null;
  }

  // Filter appointments for this patient
  const patientAppointments = useMemo(() => {
    return mockAppointments.filter((appointment) => {
      return appointment.patientId === currentUser.id &&
        (statusFilter === "all" || appointment.status === statusFilter) &&
        (searchTerm === "" || 
          appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.symptoms.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }, [currentUser.id, statusFilter, searchTerm]);

  // Group appointments by status for different sections
  const upcomingAppointments = useMemo(() => {
    return patientAppointments.filter(
      (appointment) => appointment.status !== "completed"
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [patientAppointments]);

  const pastAppointments = useMemo(() => {
    return patientAppointments.filter(
      (appointment) => appointment.status === "completed"
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [patientAppointments]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";
      case "completed":
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300";
      default:
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Appointments</h1>
        <Link
          to="/patient-dashboard/book-appointment"
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Book New Appointment
        </Link>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
              statusFilter === "all" 
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setStatusFilter("confirmed")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
              statusFilter === "confirmed" 
                ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Confirmed
          </button>
          <button 
            onClick={() => setStatusFilter("pending")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
              statusFilter === "pending" 
                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Pending
          </button>
          <button 
            onClick={() => setStatusFilter("completed")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
              statusFilter === "completed" 
                ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Completed
          </button>
        </div>
        
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search appointments..."
            className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {patientAppointments.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <Calendar className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No appointments found</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {statusFilter === "all" 
              ? "You don't have any appointments scheduled." 
              : `You don't have any ${statusFilter} appointments.`}
          </p>
          <Link
            to="/patient-dashboard/book-appointment"
            className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Book an Appointment
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Upcoming Appointments Section */}
          {(statusFilter === "all" || statusFilter === "confirmed" || statusFilter === "pending") && 
           upcomingAppointments.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Upcoming Appointments
              </h2>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-4">
                            <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {appointment.doctorName}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {appointment.type}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusBadgeClass(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            <span className="ml-1 capitalize">{appointment.status}</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      
                      {appointment.symptoms && (
                        <div className="mb-4">
                          <p className="font-medium text-gray-900 dark:text-white mb-1">Symptoms:</p>
                          <p className="text-gray-700 dark:text-gray-300">{appointment.symptoms}</p>
                        </div>
                      )}
                      
                      {appointment.virtualMeeting && (
                        <div className="mb-4">
                          <p className="font-medium text-gray-900 dark:text-white mb-1">Online Consultation:</p>
                          <a 
                            href={appointment.virtualMeeting} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <MessageSquare className="h-5 w-5 mr-2" />
                            Join Virtual Meeting
                          </a>
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-3">
                        {appointment.status === "confirmed" && (
                          <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors duration-300">
                            Cancel
                          </button>
                        )}
                        <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors duration-300">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Past Appointments Section */}
          {(statusFilter === "all" || statusFilter === "completed") && 
           pastAppointments.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Past Appointments
              </h2>
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
                  >
                    <div className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full mr-4">
                            <User className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {appointment.doctorName}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {appointment.type}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusBadgeClass(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            <span className="ml-1 capitalize">{appointment.status}</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white mb-1">Notes:</p>
                          <p className="text-gray-700 dark:text-gray-300">{appointment.notes}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-end mt-4">
                        <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors duration-300">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;