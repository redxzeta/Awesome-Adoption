import { screen, waitFor } from "@testing-library/react";
import PetInfo from "../PetInfo";
import React from "react";
import { customRender } from "../../../swrconfigtest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PetAuthProvider from "../../../context/TokenContext";

describe("Testing animal with data", () => {
  test("Animal data renders correctly", async () => {
    customRender(
      <MemoryRouter initialEntries={["/animal/1"]}>
        <PetAuthProvider>
          <Routes>
            <Route path="animal/:id" element={<PetInfo />} />
          </Routes>
        </PetAuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    );
    expect(
      screen.getByRole("heading", { name: /Baby Yoda/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByText(/He is a toddler member /i)).toBeInTheDocument();
    expect(screen.getByText(/Grogu/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Contact/i }).closest("a")
    ).toHaveAttribute("href", "mailto:yoda@onefor.me");
    expect(
      screen.getByRole("button", { name: /More Info/i }).closest("a")
    ).toHaveAttribute("href", "https://wwww.mandalorian.com");
  });
  test("Animal data not found", async () => {
    customRender(
      <MemoryRouter initialEntries={["/animal/123456"]}>
        <PetAuthProvider>
          <Routes>
            <Route path="animal/:id" element={<PetInfo />} />
          </Routes>
        </PetAuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    );
    expect(
      screen.getByRole("heading", { name: /An Error Occurred/i, level: 1 })
    ).toBeInTheDocument();
  });
});
