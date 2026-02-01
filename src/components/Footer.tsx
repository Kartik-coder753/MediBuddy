import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import logo from "../assets/logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-teal-500 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img className="h-10 w-auto" src={logo} alt="MediBuddy Logo" />
              <span className="ml-2 text-2xl font-bold text-white">MEDIBUDDY</span>
            </div>
            <p className="text-sm text-blue-50">
              Your trusted healthcare companion, connecting patients and doctors for better healthcare experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-50 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-blue-50 hover:text-white transition-colors duration-300">
                  Login
                </Link>
              </li>
              <li>
                <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
                  Online Consultations
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
                  Medical Records
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
                  Appointment Scheduling
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
                  24/7 Support
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
                  Emergency Services
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-200 mr-2 mt-0.5" />
                <span className="text-blue-50">
                  123 Healthcare Avenue, Medical District, City, Country - 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-200 mr-2" />
                <span className="text-blue-50">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-200 mr-2" />
                <span className="text-blue-50">info@medibuddy.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-blue-400 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-blue-50">
            &copy; {currentYear} MediBuddy. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-blue-50 hover:text-white transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;