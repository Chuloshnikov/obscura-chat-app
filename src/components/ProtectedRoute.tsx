// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader } from "lucide-react";
import { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};