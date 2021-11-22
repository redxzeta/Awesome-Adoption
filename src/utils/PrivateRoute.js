import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/SupaContext";

const PrivateRoute = ({ children }) => {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
