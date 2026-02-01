import React, { useState, useMemo } from "react";
import { Calendar, Clock, User, MessageSquare, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { mockAppointments } from "../../data/mockData";

type AppointmentStatus = "all" | "confirmed" | "pending" | "completed";

const DoctorAppointments = () => {
  const { currentUser } = useAuth();
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  if (!currentUser || currentUser.userType !== "doctor") {
    return null;
  }

  // Filter appointments for this doctor
  const doctorAppointments = useMemo(() => {
    return mockAppointments.filter((appointment) => {
      return appointment.doctorId === currentUser.id &&
        (statusFilter === "all" || appointment.status === statusFilter) &&
        (searchTerm === "" || 
          appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.symptoms.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }, [currentUser.id, statusFilter, searchTerm]);

  // Group appointments by date
  const appointmentsByDate = useMemo(() => {
    const grouped: Record<string, typeof mockAppointments> = {};
    
    doctorAppointments.forEach((appointment) => {
      if (!grouped[appointment.date]) {
        grouped[appointment.date] = [];
      }
      grouped[appointment.date].push(appointment);
    });
    
    // Sort dates
    return Object.keys(grouped)
      .sort()
      .reduce((acc, date) => {
        acc[date] = grouped[date];
        return acc;
      }, {} as Record<string, typeof mockAppointments>);
  }, [doctorAppointments]);

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
          Export Schedule
        </button>
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
          <input
            type="text"
            placeholder="Search appointments..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {Object.keys(appointmentsByDate).length === 0 ? (
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
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(appointmentsByDate).map(([date, appointments]) => (
            <div key={date}>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {formatDate(date)}
              </h2>
              <div className="space-y-4">
                {appointments.map((appointment) => (
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
                              {appointment.patientName}
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center text-gray-700 dark:text-gray-300">
                          <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                          <span>{appointment.time}</span>
                        </div>
                        
                        {appointment.virtualMeeting && (
                          <div className="flex items-center text-gray-700 dark:text-gray-300 md:col-span-2">
                            <MessageSquare className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                            <a 
                              href={appointment.virtualMeeting} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Join Virtual Meeting
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="font-medium text-gray-900 dark:text-white mb-1">Symptoms:</p>
                        <p className="text-gray-700 dark:text-gray-300">{appointment.symptoms}</p>
                        
                        {appointment.notes && (
                          <div className="mt-3">
                            <p className="font-medium text-gray-900 dark:text-white mb-1">Notes:</p>
                            <p className="text-gray-700 dark:text-gray-300">{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end mt-4 space-x-3">
                        <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors duration-300">
                          View Patient
                        </button>
                        
                        {appointment.status === "pending" && (
                          <>
                            <button className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors duration-300">
                              Confirm
                            </button>
                            <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors duration-300">
                              Decline
                            </button>
                          </>
                        )}
                        
                        {appointment.status === "confirmed" && (
                          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-300">
                            Start Consultation
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;