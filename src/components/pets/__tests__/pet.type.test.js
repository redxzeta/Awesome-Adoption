import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import PetAuthProvider from "../../../context/TokenContext";
import { customRender } from "../../../swrconfigtest";
import { rest, server } from "../../../testServer";
import PetType from "../PetType";

describe("<PetType/>", () => {
  test("pet load successful", async () => {
    customRender(
      <MemoryRouter initialEntries={["/pets/dog"]}>
        <PetAuthProvider>
          <Routes>
            <Route path="pets/:type" element={<PetType />} />
          </Routes>
        </PetAuthProvider>
      </MemoryRouter>
    );

    expect(screen.getAllByRole("status")).toHaveLength(3);
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    );

    const petCards = screen.getAllByRole("button", { name: /More Info/i });
    expect(petCards).toHaveLength(12);
  });

  test("validity of zipcode", async () => {
    customRender(
      <MemoryRouter initialEntries={["/pets/dog"]}>
        <PetAuthProvider>
          <Routes>
            <Route path="pets/:type" element={<PetType />} />
          </Routes>
        </PetAuthProvider>
      </MemoryRouter>
    );
    expect(screen.getAllByRole("status")).toHaveLength(3);
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    );
    const goZip = await screen.findByRole("button", { name: /Go/i });
    expect(goZip).toBeInTheDocument();

    expect(goZip).toBeEnabled();

    const zipForm = screen.getByLabelText(/zipcode/i);
    expect(zipForm).toHaveValue("19019");
    userEvent.clear(screen.getByLabelText(/zipcode/i));
    expect(zipForm).toHaveValue("");
    expect(goZip).toBeDisabled();
    userEvent.type(zipForm, "abcde");
    expect(goZip).toBeDisabled();
    expect(screen.getByText(/Invalid zip Code/i)).toBeInTheDocument();
    userEvent.clear(screen.getByLabelText(/zipcode/i));
    expect(screen.queryByText(/Invalid zip Code/i)).not.toBeInTheDocument();
    expect(zipForm).toHaveValue("");
    expect(goZip).toBeDisabled();
  });
});
