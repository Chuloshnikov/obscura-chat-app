export interface FormTypes {
    fullName?: string
    email: string;
    password: string;
}

type FormType = "sign-in" | "sign-up";

export interface User {
    _id: string;
    username: string;
    email: string;
    profilePic?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
  
// src/types/index.ts
interface User {
  _id: string;
  username: string;
  email: string;
  [key: string]: any;
}

interface Message {
  _id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  [key: string]: any;
}

interface AuthState {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: SocketIOClient.Socket | null;
}

interface ChatState {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
}