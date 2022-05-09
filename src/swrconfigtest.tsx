import { RenderOptions, render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { SWRConfig } from "swr";

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
) => render(ui, { wrapper: AllTheProviders, ...options });
