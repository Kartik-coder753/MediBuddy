import React from "react";
import { Star, Mail, Phone, MapPin, Award, Briefcase, Users, Calendar } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { mockAppointments } from "../../data/mockData";

const DoctorProfile = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.userType !== "doctor") {
    return null;
  }

  // Count upcoming appointments
  const upcomingAppointments = mockAppointments.filter(
    (appointment) => appointment.doctorId === currentUser.id && appointment.status !== "completed"
  ).length;

  // Count patients (unique patient IDs from appointments)
  const patientIds = new Set(
    mockAppointments
      .filter((appointment) => appointment.doctorId === currentUser.id)
      .map((appointment) => appointment.patientId)
  );
  const patientCount = patientIds.size;

  return (
    <div className="p-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4 text-white">
              <h3 className="text-lg font-semibold">Doctor Profile</h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center">
                <img
                  src={currentUser.profilePicture || "https://via.placeholder.com/150"}
                  alt={currentUser.name}
                  className="h-32 w-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
                />
                <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{currentUser.name}</h2>
                <p className="text-blue-600 dark:text-blue-400 mb-2">{currentUser.specialty}</p>
                
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(currentUser.rating) 
                          ? "text-yellow-500 fill-current" 
                          : "text-gray-300 dark:text-gray-600"
                      }`} 
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                    {currentUser.rating} ({currentUser.reviewCount} reviews)
                  </span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
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
                  <span>123 Medical Center, New York, NY</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400 mb-3">
                  Qualifications
                </h4>
                <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2">
                  <Award className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <span>{currentUser.qualifications}</span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                  <span>{currentUser.experience}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4 text-white">
              <h3 className="text-lg font-semibold">About Me</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {currentUser.bio}
              </p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                      Total Patients
                    </h4>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{patientCount}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Unique patients under care
                  </p>
                </div>
                
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-full">
                      <Calendar className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <h4 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                      Upcoming Appointments
                    </h4>
                  </div>
                  <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{upcomingAppointments}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Scheduled consultations
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-4 text-white">
              <h3 className="text-lg font-semibold">Schedule & Availability</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Consultation Hours
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </li>
                    <li className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Saturday</span>
                      <span>10:00 AM - 2:00 PM</span>
                    </li>
                    <li className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    Specializations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                      {currentUser.specialty}
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                      Preventative Care
                    </span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                      Chronic Disease Management
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm">
                      Telehealth
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
                  Update Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;