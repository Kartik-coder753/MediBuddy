import React from "react";
import { Mail, Phone, MapPin, Calendar, FileText, Pill, AlertTriangle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { mockAppointments, mockMedicalRecords, mockMedications } from "../../data/mockData";

const PatientProfile = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.userType !== "patient") {
    return null;
  }

  // Count upcoming appointments
  const upcomingAppointments = mockAppointments.filter(
    (appointment) => appointment.patientId === currentUser.id && appointment.status !== "completed"
  ).length;

  // Count total medical records
  const totalMedicalRecords = mockMedicalRecords.filter(
    (record) => record.patientId === currentUser.id
  ).length;

  // Count active medications
  const activeMedications = mockMedications.filter(
    (medication) => medication.patientId === currentUser.id
  ).length;

  return (
    <div className="p-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-6 text-white">
              <div className="flex flex-col items-center">
                <img
                  src={currentUser.profilePicture || "https://via.placeholder.com/150"}
                  alt={currentUser.name}
                  className="h-24 w-24 rounded-full object-cover border-4 border-white"
                />
                <h2 className="mt-4 text-xl font-bold">{currentUser.name}</h2>
                <p className="text-blue-100">Patient ID: {currentUser.id}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <span>{currentUser.email}</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                    <span>123 Main St, Anytown, USA</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Medical Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Age</p>
                    <p className="text-gray-900 dark:text-white">{currentUser.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Blood Type</p>
                    <p className="text-gray-900 dark:text-white">{currentUser.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Allergies
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentUser.allergies.map((allergy, index) => (
                        <div 
                          key={index}
                          className="flex items-center px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full"
                        >
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          <span className="text-sm">{allergy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Medical History
                    </p>
                    <p className="text-gray-900 dark:text-white">{currentUser.medicalHistory}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Emergency Contact
                    </p>
                    <p className="text-gray-900 dark:text-white">{currentUser.emergencyContact}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Health Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                      Appointments
                    </h4>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{upcomingAppointments}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Upcoming appointments
                  </p>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
                      <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                      Medical Records
                    </h4>
                  </div>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalMedicalRecords}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Total records
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                      <Pill className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                      Medications
                    </h4>
                  </div>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{activeMedications}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Active prescriptions
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Recent Activity
              </h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">
                      Appointment Scheduled
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      You scheduled an appointment with Dr. John Smith for May 10, 2025 at 9:30 AM.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      2 days ago
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Pill className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">
                      Medication Refill
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your prescription for Lisinopril was refilled and is ready for pickup.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      1 week ago
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900 dark:text-white">
                      Medical Record Updated
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Dr. John Smith updated your medical record with new information from your last visit.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      2 weeks ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Wellness Tips
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                    Stay Hydrated
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Remember to drink at least 8 glasses of water daily for optimal health.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                    Exercise Regularly
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Aim for at least 30 minutes of moderate exercise 5 days a week.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                    Healthy Diet
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Include plenty of fruits, vegetables, and whole grains in your daily meals.
                  </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                    Adequate Sleep
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    Try to get 7-9 hours of quality sleep each night for better health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;