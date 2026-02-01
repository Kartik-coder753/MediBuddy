import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Bell, Shield, Monitor } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

const PatientSettings = () => {
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '+91 98765 43210',
    address: '123 Main St, Mumbai, Maharashtra - 400001',
    emergencyContact: currentUser?.emergencyContact || '',
    notifications: {
      email: true,
      sms: true,
      app: true,
      appointments: true,
      medications: true,
      reports: true
    },
    privacy: {
      profileVisibility: 'doctors',
      shareHealthData: true,
      allowMessaging: true
    },
    appearance: 'system',
    accessibility: {
      fontSize: 'normal',
      highContrast: false,
      reducedMotion: false
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings updated successfully!');
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
                Emergency Contact
              </label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
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

        {/* Notification Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Notification Preferences
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notification Channels
                </h3>
                <div className="space-y-2">
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
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notification Types
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.notifications.appointments}
                      onChange={(e) => setFormData({
                        ...formData,
                        notifications: { ...formData.notifications, appointments: e.target.checked }
                      })}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Appointment Reminders</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.notifications.medications}
                      onChange={(e) => setFormData({
                        ...formData,
                        notifications: { ...formData.notifications, medications: e.target.checked }
                      })}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Medication Reminders</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.notifications.reports}
                      onChange={(e) => setFormData({
                        ...formData,
                        notifications: { ...formData.notifications, reports: e.target.checked }
                      })}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Medical Reports</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Privacy & Security
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Visibility
              </label>
              <select
                value={formData.privacy.profileVisibility}
                onChange={(e) => setFormData({
                  ...formData,
                  privacy: { ...formData.privacy, profileVisibility: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="doctors">Doctors Only</option>
                <option value="registered">Registered Users</option>
                <option value="private">Private</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.privacy.shareHealthData}
                  onChange={(e) => setFormData({
                    ...formData,
                    privacy: { ...formData.privacy, shareHealthData: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Share health data with healthcare providers
                </span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.privacy.allowMessaging}
                  onChange={(e) => setFormData({
                    ...formData,
                    privacy: { ...formData.privacy, allowMessaging: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Allow doctors to send you messages
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Monitor className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Appearance & Accessibility
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Theme
              </h3>
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
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Accessibility
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                    Font Size
                  </label>
                  <select
                    value={formData.accessibility.fontSize}
                    onChange={(e) => setFormData({
                      ...formData,
                      accessibility: { ...formData.accessibility, fontSize: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="small">Small</option>
                    <option value="normal">Normal</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                </div>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.accessibility.highContrast}
                    onChange={(e) => setFormData({
                      ...formData,
                      accessibility: { ...formData.accessibility, highContrast: e.target.checked }
                    })}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">High Contrast Mode</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.accessibility.reducedMotion}
                    onChange={(e) => setFormData({
                      ...formData,
                      accessibility: { ...formData.accessibility, reducedMotion: e.target.checked }
                    })}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Reduced Motion</span>
                </label>
              </div>
            </div>
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

export default PatientSettings;