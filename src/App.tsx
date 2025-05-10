
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

import { Routes, Route, Navigate } from "react-router-dom";

import { Toaster } from "sonner";
import { Loader } from "lucide-react";


function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  if (!authUser) {
    return (
     <Navigate to="/sign-in"/>
    )
  }

  return (
    <div>
    <Navbar/>
      <Routes>
          <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/sign-in"/>}/>
          <Route path="/sign-up" element={!authUser ? <SignUpPage/> : <Navigate to="/"/>}/>
          <Route path="/sign-in" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
          <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/sign-in"/>}/>
      </Routes>
    <Toaster/>
</div>
  )
}

export default App
