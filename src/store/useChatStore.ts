
import { create } from "zustand";
import { toast } from "sonner";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { ChatState, Message, MessageData, User } from "../types";

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get<User[]>("/messages/users");
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ошибка при получении пользователей");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  
  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get<Message[]>(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ошибка при получении сообщений");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  
  sendMessage: async (messageData: MessageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;
    
    try {
      const res = await axiosInstance.post<Message>(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Ошибка при отправке сообщения");
    }
  },
  
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage: Message) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;
      
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
  
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  
  setSelectedUser: (selectedUser: User) => set({ selectedUser }),
}));