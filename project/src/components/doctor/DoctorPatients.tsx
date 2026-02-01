import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, User, ChevronRight } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { mockAppointments, mockUsers } from "../../data/mockData";

const DoctorPatients = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  if (!currentUser || currentUser.userType !== "doctor") {
    return null;
  }

  // Get unique patient IDs from appointments
  const patientIds = useMemo(() => {
    const ids = new Set(
      mockAppointments
        .filter((appointment) => appointment.doctorId === currentUser.id)
        .map((appointment) => appointment.patientId)
    );
    return Array.from(ids);
  }, [currentUser.id]);

  // Get patient data for each patient ID
  const patients = useMemo(() => {
    return mockUsers.filter(
      (user) => user.userType === "patient" && patientIds.includes(user.id)
    );
  }, [patientIds]);

  // Filter patients based on search term
  const filteredPatients = useMemo(() => {
    if (!searchTerm) return patients;
    
    return patients.filter(
      (patient) => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (patient.medicalHistory && patient.medicalHistory.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [patients, searchTerm]);

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Patients</h1>
        
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredPatients.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <User className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No patients found</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {searchTerm 
              ? `No patients match the search term "${searchTerm}".` 
              : "You don't have any patients yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Link
              key={patient.id}
              to={`/doctor-dashboard/patients/${patient.id}`}
              className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <img
                    src={patient.profilePicture || "https://via.placeholder.com/150"}
                    alt={patient.name}
                    className="h-16 w-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {patient.age} years | {patient.bloodType}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Medical History:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{patient.medicalHistory}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Allergies:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {patient.allergies.map((allergy, index) => (
                        <span 
                          key={index}
                          className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-xs"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">View Complete Profile</span>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorPatients;