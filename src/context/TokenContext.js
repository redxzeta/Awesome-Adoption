import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const initialState = { session: null, user: null, username: null };
export const AuthContext = createContext(initialState);

const [token, setToken] = useState("");
const [Authenticated, setAuthenticated] = useState(false);

useEffect(() => {
  const fetchFunction = () => {
    fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_PETFINDER_KEY}`,
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.access_token);
        setToken(data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!localStorage.getItem("token")) {
    fetchFunction();
  } else {
    const decodedToken = jwtDecode(localStorage.getItem("token"));

    const currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      fetchFunction();
    } else {
      setToken(localStorage.getItem("token"));
    }
  }

  setAuthenticated(true);
}, []);

const TokenContext = React.createContext("");

export default TokenContext;

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("useAuth must be used within AuthProvider");
  return context;
}
