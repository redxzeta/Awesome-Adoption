import { RenderOptions, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PetAuthContext, PetTokenType } from "context/TokenContext";
import React, { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-supabase";
import { SWRConfig } from "swr";
import { supabase } from "testServer";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      {children}
    </SWRConfig>
  );
};

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: AllTheProviders, ...options })
  };
};

type CustomRouteType = {
  route: string;
  name: string;
};

const defaultRoute: CustomRouteType = { route: "/", name: "Testing Page" };

export const customRouterRender = (
  ui: ReactElement,
  routeConfig = defaultRoute,
  options?: Omit<RenderOptions, "wrapper">
) => {
  window.history.pushState({}, routeConfig.name, routeConfig.route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: customProvider, ...options })
  };
};

const customProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider value={supabase}>
      <PetAuthContext.Provider value={initialState}>
        <BrowserRouter>
          <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
            {children}
          </SWRConfig>
        </BrowserRouter>
      </PetAuthContext.Provider>
    </Provider>
  );
};
const initialState: PetTokenType = {
  tokenHeaders: "yayeet",
  loading: false,
  errors: false
};
