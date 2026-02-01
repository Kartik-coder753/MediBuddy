import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { 
  User, 
  Calendar, 
  FileText, 
  Pill, 
  Phone, 
  Mail, 
  AlertTriangle, 
  Activity,
  PlusCircle
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { 
  mockUsers, 
  mockAppointments, 
  mockMedications, 
  mockMedicalRecords 
} from "../../data/mockData";

const DoctorPatientDetails = () => {
  const { currentUser } = useAuth();
  const { patientId } = useParams<{ patientId: string }>();
  
  if (!currentUser || currentUser.userType !== "doctor" || !patientId) {
    return null;
  }

  // Get patient data
  const patient = useMemo(() => {
    return mockUsers.find(
      (user) => user.userType === "patient" && user.id === patientId
    );
  }, [patientId]);

  // Get patient appointments with this doctor
  const patientAppointments = useMemo(() => {
    return mockAppointments.filter(
      (appointment) => 
        appointment.patientId === patientId && 
        appointment.doctorId === currentUser.id
    );
  }, [patientId, currentUser.id]);

  // Get patient medications
  const patientMedications = useMemo(() => {
    return mockMedications.filter(
      (medication) => medication.patientId === patientId
    );
  }, [patientId]);

  // Get patient medical records
  const patientMedicalRecords = useMemo(() => {
    return mockMedicalRecords.filter(
      (record) => record.patientId === patientId
    );
  }, [patientId]);

  if (!patient) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Patient not found</h2>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fadeIn">
      <div className="mb-8">
        <div className="flex items-center">
          <img
            src={patient.profilePicture || "https://via.placeholder.com/150"}
            alt={patient.name}
            className="h-20 w-20 rounded-full object-cover mr-6"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{patient.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {patient.age} years | {patient.bloodType}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Info Column */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
              Patient Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email:</p>
                <div className="flex items-center mt-1">
                  <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <p className="text-gray-900 dark:text-white">{patient.email}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Emergency Contact:</p>
                <div className="flex items-center mt-1">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                  <p className="text-gray-900 dark:text-white">{patient.emergencyContact}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Medical History:</p>
                <p className="text-gray-900 dark:text-white mt-1">{patient.medicalHistory}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Allergies:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {patient.allergies.map((allergy, index) => (
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
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Vital Signs
              </h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Update
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Blood Pressure</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">120/80</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Last updated: 2025-04-15</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Heart Rate</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">72 bpm</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Last updated: 2025-04-15</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Temperature</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">98.6°F</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Last updated: 2025-04-15</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">Weight</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">165 lbs</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Last updated: 2025-04-15</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle Column - Medical Records & Medications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Appointments Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Appointments
              </h2>
              <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
                <PlusCircle className="h-4 w-4 mr-1" />
                Schedule New
              </button>
            </div>
            
            {patientAppointments.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No appointments found.</p>
            ) : (
              <div className="space-y-4">
                {patientAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-md mr-3">
                          <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {appointment.date} | {appointment.time}
                        </span>
                      </div>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        appointment.status === "confirmed" 
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" 
                          : appointment.status === "pending"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-medium">Type:</span> {appointment.type}
                    </p>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-medium">Symptoms:</span> {appointment.symptoms}
                    </p>
                    
                    {appointment.notes && (
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Notes:</span> {appointment.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Medical Records Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Medical Records
              </h2>
              <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Record
              </button>
            </div>
            
            {patientMedicalRecords.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No medical records found.</p>
            ) : (
              <div className="space-y-4">
                {patientMedicalRecords.map((record) => (
                  <div 
                    key={record.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-md mr-3">
                          <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {record.diagnosis}
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Date: {record.date} | Doctor: {record.doctorName}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-medium">Symptoms:</span> {record.symptoms}
                    </p>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-medium">Treatment:</span> {record.treatment}
                    </p>
                    
                    {record.notes && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        <span className="font-medium">Notes:</span> {record.notes}
                      </p>
                    )}
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Follow Up:</span> {record.followUp}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Medications Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Pill className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Medications
              </h2>
              <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
                <PlusCircle className="h-4 w-4 mr-1" />
                Prescribe Medication
              </button>
            </div>
            
            {patientMedications.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No medications found.</p>
            ) : (
              <div className="space-y-4">
                {patientMedications.map((medication) => (
                  <div 
                    key={medication.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <div className="bg-green-100 dark:bg-green-900/30 p-1.5 rounded-md mr-3">
                          <Pill className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {medication.name} - {medication.dosage}
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Prescribed: {medication.prescribedDate} | Expires: {medication.endDate}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-medium">Frequency:</span> {medication.frequency}
                    </p>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-medium">Purpose:</span> {medication.purpose}
                    </p>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <span className="font-medium">Instructions:</span> {medication.instructions}
                    </p>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Side Effects:</span> {medication.sideEffects}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientDetails;