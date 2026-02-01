import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Clock, Bell, Shield, Monitor } from 'lucide-react';
import { toast } from 'react-toastify';

const DoctorSettings = () => {
  const [formData, setFormData] = useState({
    name: 'Dr. Gaurav Sharma',
    email: 'gaurav@example.com',
    phone: '+91 98765 43210',
    address: 'Apollo Hospitals, Sector 26, Noida, UP - 201301',
    consultationFee: '1000',
    workingHours: {
      monday: { start: '09:00', end: '17:00', enabled: true },
      tuesday: { start: '09:00', end: '17:00', enabled: true },
      wednesday: { start: '09:00', end: '17:00', enabled: true },
      thursday: { start: '09:00', end: '17:00', enabled: true },
      friday: { start: '09:00', end: '17:00', enabled: true },
      saturday: { start: '10:00', end: '14:00', enabled: true },
      sunday: { start: '00:00', end: '00:00', enabled: false },
    },
    notifications: {
      email: true,
      sms: true,
      app: true,
    },
    appearance: 'system',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings updated successfully!');
  };

  const handleWorkingHoursChange = (day: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="p-6 animate-fadeIn">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Profile Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Consultation Fee (₹)
              </label>
              <input
                type="number"
                value={formData.consultationFee}
                onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Working Hours
          </h2>
          
          <div className="space-y-4">
            {Object.entries(formData.workingHours).map(([day, hours]) => (
              <div key={day} className="flex items-center space-x-4">
                <div className="w-28">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {day}
                  </span>
                </div>
                
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={hours.enabled}
                    onChange={(e) => handleWorkingHoursChange(day, 'enabled', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Available</span>
                </label>
                
                <input
                  type="time"
                  value={hours.start}
                  onChange={(e) => handleWorkingHoursChange(day, 'start', e.target.value)}
                  disabled={!hours.enabled}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
                
                <span className="text-gray-500 dark:text-gray-400">to</span>
                
                <input
                  type="time"
                  value={hours.end}
                  onChange={(e) => handleWorkingHoursChange(day, 'end', e.target.value)}
                  disabled={!hours.enabled}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Notification Preferences
          </h2>
          
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.notifications.email}
                onChange={(e) => setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, email: e.target.checked }
                })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Email Notifications</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.notifications.sms}
                onChange={(e) => setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, sms: e.target.checked }
                })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">SMS Notifications</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.notifications.app}
                onChange={(e) => setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, app: e.target.checked }
                })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">In-App Notifications</span>
            </label>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Monitor className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Appearance
          </h2>
          
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="appearance"
                value="light"
                checked={formData.appearance === 'light'}
                onChange={(e) => setFormData({ ...formData, appearance: e.target.value })}
                className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Light Mode</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="appearance"
                value="dark"
                checked={formData.appearance === 'dark'}
                onChange={(e) => setFormData({ ...formData, appearance: e.target.value })}
                className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Dark Mode</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="radio"
                name="appearance"
                value="system"
                checked={formData.appearance === 'system'}
                onChange={(e) => setFormData({ ...formData, appearance: e.target.value })}
                className="rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">System Default</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorSettings;