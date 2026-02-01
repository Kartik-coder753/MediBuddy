import React from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  FileText, 
  Clock, 
  MessageSquare, 
  Shield, 
  Star, 
  ChevronRight
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();
  
  const getDashboardLink = () => {
    if (!currentUser) return "/login";
    return currentUser.userType === "doctor" ? "/doctor-dashboard" : "/patient-dashboard";
  };

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-8 right-20 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-6000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-500 to-teal-400 text-transparent bg-clip-text">
              Your Health, Our Priority
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300 leading-relaxed">
              MediBuddy connects patients with healthcare professionals for seamless medical care and communication.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to={getDashboardLink()}
                className="px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Started
              </Link>
              <a
                href="#features"
                className="px-8 py-3 text-lg font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
          
          <div className="mt-16 relative">
            <div className="relative w-full max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="MediBuddy Platform"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold">Experience Modern Healthcare</h3>
                <p className="text-gray-200">Connect with doctors, manage appointments, and access medical records easily.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              MediBuddy provides a range of features designed to simplify healthcare management for both patients and doctors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 dark:bg-gray-800 p-8 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Easy Appointment Scheduling
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Book, reschedule, or cancel appointments with your healthcare providers in just a few clicks.
              </p>
            </div>
            
            <div className="bg-teal-50 dark:bg-gray-800 p-8 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Medical Records Access
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                View your complete medical history, diagnoses, and treatment plans securely from anywhere.
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-gray-800 p-8 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Doctor-Patient Communication
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Seamless communication between doctors and patients for better healthcare coordination.
              </p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-gray-800 p-8 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-yellow-600 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Medication Reminders
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Never miss a dose with timely medication reminders and prescription management.
              </p>
            </div>
            
            <div className="bg-red-50 dark:bg-gray-800 p-8 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Virtual Consultations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with healthcare providers remotely through secure video consultations.
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-gray-800 p-8 rounded-xl shadow-md transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Secure & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced security measures to protect your sensitive medical information and privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Hear from patients and doctors who have transformed their healthcare experience with MediBuddy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md relative">
              <div className="absolute -top-5 left-5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-6 text-gray-600 dark:text-gray-400 mb-4">
                "MediBuddy has revolutionized how I manage my healthcare. Scheduling appointments is so easy, and I love having all my medical records in one place."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Patient"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Robert Chen</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Patient</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md relative">
              <div className="absolute -top-5 left-5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-6 text-gray-600 dark:text-gray-400 mb-4">
                "As a busy physician, MediBuddy has streamlined my practice. I can manage patients more efficiently and provide better care with all the tools available."
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Doctor"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Dr. Michael Rivera</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cardiologist</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md relative">
              <div className="absolute -top-5 left-5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
              </div>
              <p className="mt-6 text-gray-600 dark:text-gray-400 mb-4">
                "The virtual consultations feature saved me so much time. I could connect with my doctor from home during my recovery period. Truly a game-changer!"
              </p>
              <div className="flex items-center">
                <img
                  src="https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Patient"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Sophia Garcia</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Patient</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Better Healthcare?</h2>
          <p className="text-xl text-blue-50 mb-8 max-w-3xl mx-auto">
            Join thousands of patients and healthcare providers who are already using MediBuddy to simplify healthcare management.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-8 py-3 text-lg font-medium text-blue-600 bg-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Started Today
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;