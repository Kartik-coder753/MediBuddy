import React, { useState } from 'react';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';
import { mockUsers } from '../data/mockData';

const Chat = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const selectedUser = selectedUserId 
    ? mockUsers.find(user => user.id === selectedUserId)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ChatList onSelectChat={setSelectedUserId} />
          </div>
          <div className="lg:col-span-2">
            {selectedUser ? (
              <ChatWindow
                recipientId={selectedUser.id}
                recipientName={selectedUser.name}
                recipientType={selectedUser.userType}
              />
            ) : (
              <div className="h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Select a chat to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;