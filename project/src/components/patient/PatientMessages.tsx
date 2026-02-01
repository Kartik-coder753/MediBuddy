import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Phone, Video, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockUsers } from '../../data/mockData';
import { format } from 'date-fns';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

const PatientMessages = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  // Filter doctors based on search term
  const doctors = mockUsers.filter(user => 
    user.userType === 'doctor' &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.specialty?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Mock messages
  useEffect(() => {
    if (selectedDoctor) {
      const mockMessages: Message[] = [
        {
          id: '1',
          senderId: currentUser?.id || '',
          receiverId: selectedDoctor.id,
          content: 'Hello Dr. ' + selectedDoctor.name,
          timestamp: new Date(2025, 3, 15, 10, 30)
        },
        {
          id: '2',
          senderId: selectedDoctor.id,
          receiverId: currentUser?.id || '',
          content: 'Hi! How can I help you today?',
          timestamp: new Date(2025, 3, 15, 10, 31)
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedDoctor, currentUser]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedDoctor) return;

    const message: Message = {
      id: Math.random().toString(),
      senderId: currentUser?.id || '',
      receiverId: selectedDoctor.id,
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="p-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        {/* Doctors List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors..."
                className="w-full pl-10 pr-4 py-2 rounded-full border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100vh-16rem)]">
            {doctors.map(doctor => (
              <div
                key={doctor.id}
                onClick={() => setSelectedDoctor(doctor)}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                  selectedDoctor?.id === doctor.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={doctor.profilePicture}
                    alt={doctor.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {doctor.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {doctor.specialty}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(doctor.rating)
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                        ({doctor.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {selectedDoctor ? (
            <div className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={selectedDoctor.profilePicture}
                    alt={selectedDoctor.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {selectedDoctor.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedDoctor.specialty}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <Video className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.senderId === currentUser?.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {format(message.timestamp, 'HH:mm')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-full border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Select a doctor to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientMessages;