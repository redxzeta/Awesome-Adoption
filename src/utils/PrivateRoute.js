import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/SupaContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { session } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        session ? <Component {...props} /> : <Navigate to="/" />
      }
    />
  );
};

export default PrivateRoute;
