import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

export type PetTokenType = {
  tokenHeaders: string | null;
  loading: boolean;
  errors: boolean;
};

const initialState: PetTokenType = {
  tokenHeaders: null,
  loading: false,
  errors: false
};
type Props = {
  children?: React.ReactNode | React.ReactNode[];
};
type TokenInfo = { name: string; exp: number };
export const PetAuthContext = createContext(initialState);
export default function PetAuthProvider({ children }: Props) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchFunction = async () => {
      setState(s => ({ ...s, loading: true, errors: false }));
      try {
        const key = `${process.env.REACT_APP_PETFINDER_KEY}`;
        const secret = `${process.env.REACT_APP_PETFINDER_SECRET}`;
        fetch("https://api.petfinder.com/v2/oauth2/token", {
          method: "POST",
          body: "grant_type=client_credentials&client_id=" + key + "&client_secret=" + secret,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            const headers = data.token_type + " " + data.access_token;
            setState(s => ({ ...s, tokenHeaders: headers }));
          });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setState(s => ({ ...s, errors: true }));
      } finally {
        setState(s => ({ ...s, loading: false }));
      }
    };
    const localStorageToken = localStorage.getItem("token");
    if (!localStorageToken) {
      fetchFunction();
    } else {
      const currentDate = new Date();
      const decodedToken = jwtDecode<TokenInfo>(localStorageToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        fetchFunction();
      } else {
        setState(s => ({ ...s, loading: true }));
        const headers = `Bearer ${localStorage.getItem("token")}`;
        setState(s => ({ ...s, tokenHeaders: headers, loading: false }));
      }
    }
  }, []);

  return <PetAuthContext.Provider value={state}>{children}</PetAuthContext.Provider>;
}

export function usePetAuth() {
  const context = useContext(PetAuthContext);
  if (context === undefined) throw Error("usePetAuth must be used within PetAuthProvider");
  return context;
}
