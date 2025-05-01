export interface FormTypes {
    fullName?: string
    email: string;
    password: string;
}

type FormType = "sign-in" | "sign-up";

export interface User {
    _id: string;
    fullName: string;
    email: string;
    profilePic?: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface AuthState {
    authUser: User | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    onlineUsers: string[];
    socket: any; // Можно заменить на более специфичный тип Socket от socket.io
    
    // Методы
    checkAuth: () => Promise<void>;
    signUp: (data: SignupData) => Promise<void>;
    logIn: (data: LoginData) => Promise<void>;
    logOut: () => Promise<void>;
    updateProfile: (data: UpdateProfileData) => Promise<void>;
    connectSocket: () => void;
    disconnectSocket: () => void;
  }
  
  export interface SignupData {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
  }
  
  export interface LoginData {
    username: string;
    password: string;
  }
  
  export interface UpdateProfileData {
    fullName?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    profilePic?: File;
  }
  
  // Типы для useChatStore
  export interface Message {
    _id: string;
    text: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
    // Добавьте другие свойства сообщения по необходимости
  }
  
  export interface ChatState {
    messages: Message[];
    users: User[];
    selectedUser: User | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    
    // Методы
    getUsers: () => Promise<void>;
    getMessages: (userId: string) => Promise<void>;
    sendMessage: (messageData: MessageData) => Promise<void>;
    subscribeToMessages: () => void;
    unsubscribeFromMessages: () => void;
    setSelectedUser: (selectedUser: User) => void;
  }
  
  export interface MessageData {
    text: string;
  }