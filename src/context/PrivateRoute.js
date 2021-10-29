import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./SupaContext";
const { session } = useAuth();

const PrivateRoute = ({ component: Component, ...rest }) => {
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
