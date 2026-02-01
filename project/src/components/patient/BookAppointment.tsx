import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Search, CheckCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { mockUsers, availableTimeSlots, getTodayPlus } from "../../data/mockData";

const BookAppointment = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState(getTodayPlus(1));
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("Regular Checkup");
  const [symptoms, setSymptoms] = useState("");
  const [isVirtual, setIsVirtual] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  if (!currentUser || currentUser.userType !== "patient") {
    return null;
  }

  // Get all doctors
  const doctors = useMemo(() => {
    return mockUsers.filter((user) => user.userType === "doctor");
  }, []);

  // Filter doctors based on search term
  const filteredDoctors = useMemo(() => {
    if (!searchTerm) return doctors;
    
    return doctors.filter(
      (doctor) => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doctor.specialty && doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [doctors, searchTerm]);

  // Get minimum date for appointment (tomorrow)
  const minDate = getTodayPlus(1);
  // Get maximum date for appointment (3 months from now)
  const maxDate = getTodayPlus(90);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to appointments page after successful booking
      navigate("/patient-dashboard/appointments");
    }, 1500);
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Book an Appointment</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Schedule a consultation with our healthcare providers
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doctor Selection */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Select a Doctor
          </h2>
          
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {filteredDoctors.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                No doctors found matching your search.
              </p>
            ) : (
              filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    selectedDoctor === doctor.id 
                      ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20" 
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                  }`}
                  onClick={() => setSelectedDoctor(doctor.id)}
                >
                  <div className="flex items-start">
                    <img 
                      src={doctor.profilePicture || "https://via.placeholder.com/150"}
                      alt={doctor.name}
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{doctor.specialty}</p>
                      
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(doctor.rating) 
                                  ? "text-yellow-500 fill-current" 
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">
                          ({doctor.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                    
                    {selectedDoctor === doctor.id && (
                      <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Appointment Details Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Appointment Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={minDate}
                    max={maxDate}
                    required
                  />
                </div>
                {selectedDate && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {formatDate(selectedDate)}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                  >
                    <option value="">Select a time slot</option>
                    {availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Appointment Type
              </label>
              <select
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                required
              >
                <option value="Regular Checkup">Regular Checkup</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Specialist Consultation">Specialist Consultation</option>
                <option value="Urgent Care">Urgent Care</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Prescription Renewal">Prescription Renewal</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Symptoms or Reason for Visit
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Please describe your symptoms or reason for the appointment"
                required
              ></textarea>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  id="virtual-appointment"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={isVirtual}
                  onChange={(e) => setIsVirtual(e.target.checked)}
                />
                <label 
                  htmlFor="virtual-appointment" 
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  This is a virtual appointment (online consultation)
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedDoctor && selectedDate && selectedTime ? (
                  <>
                    Booking with {filteredDoctors.find(d => d.id === selectedDoctor)?.name} on {formatDate(selectedDate)} at {selectedTime}
                  </>
                ) : (
                  "Please select a doctor, date, and time to continue"
                )}
              </p>
              
              <button
                type="submit"
                className={`px-6 py-2 bg-blue-600 text-white rounded-md ${
                  isSubmitting || !selectedDoctor || !selectedDate || !selectedTime
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-blue-700"
                } transition-colors duration-300`}
                disabled={isSubmitting || !selectedDoctor || !selectedDate || !selectedTime}
              >
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;