import React, { useState, useEffect, useRef } from 'react';
import { Send, Video, Phone, Mic, MicOff, VideoOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Peer from 'simple-peer';
import io from 'socket.io-client';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  recipientId: string;
  recipientName: string;
  recipientType: 'doctor' | 'patient';
}

const SOCKET_SERVER = 'wss://your-socket-server.com';

const ChatWindow: React.FC<ChatWindowProps> = ({ recipientId, recipientName, recipientType }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const socketRef = useRef<any>();
  const peerRef = useRef<any>();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to socket server
    socketRef.current = io(SOCKET_SERVER);

    // Listen for incoming messages
    socketRef.current.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Math.random().toString(),
      sender: currentUser?.id || '',
      content: newMessage,
      timestamp: new Date()
    };

    socketRef.current.emit('message', message);
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const startVideoCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(mediaStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }
      setIsVideoCall(true);

      // Initialize peer connection
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: mediaStream
      });

      peer.on('signal', data => {
        socketRef.current.emit('callUser', {
          userToCall: recipientId,
          signalData: data,
          from: currentUser?.id
        });
      });

      peer.on('stream', remoteStream => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });

      peerRef.current = peer;
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    setIsVideoCall(false);
    setStream(null);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {isVideoCall ? (
        <div className="relative h-full">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover rounded-t-lg"
          />
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="absolute bottom-4 right-4 w-48 h-36 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full ${
                isAudioEnabled ? 'bg-blue-600' : 'bg-red-600'
              }`}
            >
              {isAudioEnabled ? <Mic className="text-white" /> : <MicOff className="text-white" />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoEnabled ? 'bg-blue-600' : 'bg-red-600'
              }`}
            >
              {isVideoEnabled ? <Video className="text-white" /> : <VideoOff className="text-white" />}
            </button>
            <button
              onClick={endCall}
              className="p-3 rounded-full bg-red-600"
            >
              <Phone className="text-white transform rotate-135" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {recipientName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {recipientType}
              </p>
            </div>
            <button
              onClick={startVideoCall}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-full"
            >
              <Video className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === currentUser?.id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === currentUser?.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t dark:border-gray-700">
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
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatWindow;