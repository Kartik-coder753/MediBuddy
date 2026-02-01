import React, { useState } from 'react';
import { Bell, Calendar, FileText, Pill, AlertCircle, Check, X } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  type: 'appointment' | 'medical' | 'medication' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: string;
}

const PatientNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Reminder: You have an appointment with Dr. Gaurav Sharma tomorrow at 10:30 AM',
      timestamp: new Date(2025, 3, 16, 9, 0),
      read: false,
      action: 'View Appointment'
    },
    {
      id: '2',
      type: 'medication',
      title: 'Medication Reminder',
      message: 'Time to take your evening dose of Lisinopril (10mg)',
      timestamp: new Date(2025, 3, 15, 18, 0),
      read: false,
      action: 'Mark as Taken'
    },
    {
      id: '3',
      type: 'medical',
      title: 'Medical Report Available',
      message: 'Your latest blood test results are now available',
      timestamp: new Date(2025, 3, 15, 14, 30),
      read: true,
      action: 'View Report'
    },
    {
      id: '4',
      type: 'system',
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated',
      timestamp: new Date(2025, 3, 15, 11, 45),
      read: true
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification =>
      notification.id !== notificationId
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
      case 'medical':
        return <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />;
      case 'medication':
        return <Pill className="h-6 w-6 text-green-600 dark:text-green-400" />;
      default:
        return <Bell className="h-6 w-6 text-gray-600 dark:text-gray-400" />;
    }
  };

  const filteredNotifications = notifications.filter(notification =>
    filter === 'all' || !notification.read
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread</option>
            </select>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filter === 'unread'
                ? "You've read all your notifications"
                : "You don't have any notifications"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${
                  notification.read
                    ? 'border-gray-200 dark:border-gray-700'
                    : 'border-blue-200 dark:border-blue-700'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-lg font-medium ${
                          notification.read
                            ? 'text-gray-900 dark:text-white'
                            : 'text-blue-600 dark:text-blue-400'
                        }`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-full"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">
                        {notification.message}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {format(notification.timestamp, 'MMM d, yyyy HH:mm')}
                        </span>
                        {notification.action && (
                          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            {notification.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientNotifications;