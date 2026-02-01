import React, { useState, useEffect } from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockUsers } from '../../data/mockData';

interface ChatListProps {
  onSelectChat: (userId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat }) => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    // Filter users based on current user type
    const filteredUsers = mockUsers.filter(user => 
      user.userType !== currentUser?.userType && 
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setChats(filteredUsers);
  }, [currentUser, searchTerm]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 rounded-full border dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="divide-y dark:divide-gray-700">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={chat.profilePicture}
                  alt={chat.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {chat.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {chat.specialty || `${chat.age} years, ${chat.bloodType}`}
                </p>
              </div>
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;