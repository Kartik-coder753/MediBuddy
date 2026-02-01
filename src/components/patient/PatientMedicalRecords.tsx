import React, { useState, useMemo } from "react";
import { FileText, Search, Download, Calendar, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { mockMedicalRecords } from "../../data/mockData";

const PatientMedicalRecords = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  
  if (!currentUser || currentUser.userType !== "patient") {
    return null;
  }

  // Filter medical records for this patient
  const patientRecords = useMemo(() => {
    return mockMedicalRecords
      .filter(
        (record) => 
          record.patientId === currentUser.id &&
          (searchTerm === "" || 
            record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.treatment.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [currentUser.id, searchTerm]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Records</h1>
        <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
          <Download className="h-4 w-4 mr-2" />
          Export All Records
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          View and download your medical history
        </p>
        
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search records..."
            className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {patientRecords.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No medical records found</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {searchTerm 
              ? `No records match the search term "${searchTerm}".` 
              : "You don't have any medical records yet."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {patientRecords.map((record) => (
            <div 
              key={record.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {record.diagnosis}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(record.date)}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <User className="h-4 w-4 mr-1" />
                        {record.doctorName}
                      </div>
                    </div>
                  </div>
                  
                  <button className="mt-3 md:mt-0 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    <Download className="h-4 w-4 mr-1" />
                    <span>Download PDF</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Symptoms</h4>
                    <p className="text-gray-900 dark:text-white">{record.symptoms}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Treatment</h4>
                    <p className="text-gray-900 dark:text-white">{record.treatment}</p>
                  </div>
                  
                  {record.notes && (
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</h4>
                      <p className="text-gray-900 dark:text-white">{record.notes}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Follow Up</h4>
                    <p className="text-gray-900 dark:text-white">{record.followUp}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                  <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors duration-300">
                    View Full Record
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientMedicalRecords;