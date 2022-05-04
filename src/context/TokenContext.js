import jwtDecode from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

const initialState = { tokenHeaders: null, loading: false, errors: null };

export const PetAuthContext = createContext(initialState);
export default function PetAuthProvider({ children }) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchFunction = async () => {
      setState((s) => ({ ...s, loading: true }));
      try {
        const x = {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_PETFINDER_KEY}`,
        };
        const response = await fetch(
          "https://api.petfinder.com/v2/oauth2/token",
          x
        );
        const json = await response.json();

        const headers = {
          headers: {
            Authorization: `Bearer ${json.access_token}`,
          },
        };

        setState((s) => ({ ...s, tokenHeaders: headers }));
      } catch (error) {
        setState((s) => ({ ...s, errors: error }));
      } finally {
        setState((s) => ({ ...s, loading: false }));
      }
    };

    if (!localStorage.getItem("token")) {
      fetchFunction();
    } else {
      const decodedToken = jwtDecode(localStorage.getItem("token"));

      const currentDate = new Date();
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        fetchFunction();
      } else {
        setState((s) => ({ ...s, loading: true }));
        const headers = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        setState((s) => ({ ...s, tokenHeaders: headers, loading: false }));
      }
    }
  }, []);

  return (
    <PetAuthContext.Provider value={state}>{children}</PetAuthContext.Provider>
  );
}

export function usePetAuth() {
  const context = useContext(PetAuthContext);
  if (context === undefined)
    throw Error("usePetAuth must be used within PetAuthProvider");
  return context;
}
