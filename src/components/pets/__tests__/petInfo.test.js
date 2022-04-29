import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-supabase";

import PetAuthProvider from "../../../context/TokenContext";
import { customRender } from "../../../swrconfigtest";
import { supabase } from "../../../testServer";
import PetInfo from "../PetInfo";

describe("<PetInfo/>", () => {
  it("should display peta data successfully", async () => {
    customRender(
      <MemoryRouter initialEntries={["/animal/1"]}>
        <Provider value={supabase}>
          <PetAuthProvider>
            <Routes>
              <Route path="animal/:id" element={<PetInfo />} />
            </Routes>
          </PetAuthProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.queryByRole("status"));

    expect(
      screen.getByRole("heading", { name: /Baby Yoda/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(/He is a toddler member /i)).toBeInTheDocument();
    expect(screen.getByText(/Grogu/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Contact/i })).toHaveAttribute(
      "href",
      "mailto:yoda@onefor.me"
    );
    expect(screen.getByRole("button", { name: /More Info/i })).toHaveAttribute(
      "href",
      "https://wwww.mandalorian.com"
    );
  });
  it("should display pet data error", async () => {
    customRender(
      <MemoryRouter initialEntries={["/animal/123456"]}>
        {" "}
        <Provider value={supabase}>
          <PetAuthProvider>
            <Routes>
              <Route path="animal/:id" element={<PetInfo />} />
            </Routes>
          </PetAuthProvider>{" "}
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.queryByRole("status"));

    expect(
      screen.getByRole("heading", { name: /An Error Occurred/i, level: 1 })
    ).toBeInTheDocument();
  });
});
