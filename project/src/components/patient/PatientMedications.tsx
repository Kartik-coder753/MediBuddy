import React, { useState, useMemo } from "react";
import { Pill, Clock, AlertCircle, Search, Calendar, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { mockMedications } from "../../data/mockData";

const PatientMedications = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  if (!currentUser || currentUser.userType !== "patient") {
    return null;
  }

  // Filter medications for this patient
  const patientMedications = useMemo(() => {
    return mockMedications
      .filter(
        (medication) => 
          medication.patientId === currentUser.id &&
          (searchTerm === "" || 
            medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            medication.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
            medication.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => new Date(b.prescribedDate).getTime() - new Date(a.prescribedDate).getTime());
  }, [currentUser.id, searchTerm]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Group medications by time of day for the medication schedule
  const todaySchedule = [
    { time: "Morning", medications: ["Lisinopril 10mg", "Metformin 500mg"] },
    { time: "Afternoon", medications: [] },
    { time: "Evening", medications: ["Metformin 500mg"] },
    { time: "Night", medications: ["Aspirin 81mg"] },
  ];

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Medications</h1>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
          <Pill className="h-4 w-4 mr-2" />
          Request Refill
        </button>
      </div>
      
      {/* Medication Schedule Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
          Today's Medication Schedule
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {todaySchedule.map((schedule) => (
            <div 
              key={schedule.time}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
            >
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{schedule.time}</h3>
              
              {schedule.medications.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No medications scheduled</p>
              ) : (
                <ul className="space-y-2">
                  {schedule.medications.map((med, index) => (
                    <li 
                      key={index}
                      className="flex items-center text-gray-800 dark:text-gray-200"
                    >
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                      {med}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Medications List Section */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Pill className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Current Medications
          </h2>
          
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search medications..."
              className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {patientMedications.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <Pill className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No medications found</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {searchTerm 
                ? `No medications match the search term "${searchTerm}".` 
                : "You don't have any prescribed medications."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {patientMedications.map((medication) => (
              <div 
                key={medication.id}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-start md:items-center">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4 mt-1 md:mt-0">
                        <Pill className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {medication.name} - {medication.dosage}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {medication.frequency}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-3 md:mt-0 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Valid until {formatDate(medication.endDate)}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Purpose</h4>
                      <p className="text-gray-900 dark:text-white">{medication.purpose}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prescribed By</h4>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                        <p className="text-gray-900 dark:text-white">{medication.prescribedBy}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instructions</h4>
                      <p className="text-gray-900 dark:text-white">{medication.instructions}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Side Effects</h4>
                      <div className="flex items-start">
                        <AlertCircle className="h-4 w-4 mr-1 text-yellow-500 mt-0.5" />
                        <p className="text-gray-900 dark:text-white">{medication.sideEffects}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
                    <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                      Set Reminders
                    </button>
                    <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors duration-300">
                      Request Refill
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientMedications;