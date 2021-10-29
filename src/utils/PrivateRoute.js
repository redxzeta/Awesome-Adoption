import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/SupaContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { session } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        session ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
