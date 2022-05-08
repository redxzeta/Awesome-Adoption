import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/SupaContext";

type RouterType = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: RouterType) => {
  const { session } = useAuth();
  const location = useLocation();
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default PrivateRoute;
