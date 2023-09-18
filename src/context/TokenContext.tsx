import jwtDecode from "jwt-decode";
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
      setState((s) => ({ ...s, loading: true, errors: false }));
      try {
        const x = {
          method: "POST",
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
          body: `grant_type=client_credentials&client_id=${process.env.REACT_APP_PETFINDER_KEY}`
        };
        const response = await fetch(
          "https://api.petfinder.com/v2/oauth2/token",
          x
        );
        const json = await response.json();

        const headers = `Bearer ${json.access_token}`;

        setState((s) => ({ ...s, tokenHeaders: headers }));
      } catch (error) {
        setState((s) => ({ ...s, errors: true }));
      } finally {
        setState((s) => ({ ...s, loading: false }));
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
        setState((s) => ({ ...s, loading: true }));

        const headers = `Bearer ${localStorage.getItem("token")}`;

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
