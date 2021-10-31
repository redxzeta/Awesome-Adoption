import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

const initialState = { token: null, authenticated: false };
export const AuthContext = createContext(initialState);

const [state, setState] = useState(initialState);

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
        setState(data.access_token);
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
      setState(localStorage.getItem("token"));
    }
  }

  setState(true);
}, []);

const TokenContext = React.createContext("");

export default TokenContext;

export function usePetAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw Error("usePetAuth must be used within AuthProvider");
  return context;
}
