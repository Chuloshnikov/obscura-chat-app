
import { useAuthStore } from "./store/useAuthStore";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

import { Routes, Route } from "react-router-dom";

import { Toaster } from "sonner";
import { Loader } from "lucide-react";
import { ProtectedRoute } from "./components/ProtectedRoute";


function App() {
  const { isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }/>
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }/>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App
