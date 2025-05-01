import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";
import { AuthState, SignupData, LoginData, UpdateProfileData, User } from "../types";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "/";

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get<User>("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  
  signUp: async (data: SignupData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post<User>("/auth/sign-up", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to signup");
    } finally {
      set({ isSigningUp: false });
    }
  },
  
  logIn: async (data: LoginData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post<User>("/auth/sign-in", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to login");
    } finally {
      set({ isLoggingIn: false });
    }
  },
  
  logOut: async () => {
    try {
      await axiosInstance.post("/auth/sign-out");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  },
  
  updateProfile: async (data: UpdateProfileData) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put<User>("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.log("error in update profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    }) as Socket;
    
    socket.connect();
    set({ socket });
    
    socket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });
  },
  
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) socket.disconnect();
  },
}));