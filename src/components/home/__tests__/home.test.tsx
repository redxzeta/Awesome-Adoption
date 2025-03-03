import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { server } from "testServer";

import PetAuthProvider from "../../../context/TokenContext";
import { customRender } from "../../../swrconfigtest";
import Home from "../Home";
import { http, HttpResponse } from "msw";

// mock pet list

describe("<Home/>", () => {
  test("list of Pets renders correctly", async () => {
    customRender(
      <BrowserRouter>
        <PetAuthProvider>
          <Home />
        </PetAuthProvider>
      </BrowserRouter>
    );
    expect(screen.getAllByRole("status")).toHaveLength(3);
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
    const petCards = screen.getAllByRole("button", { name: /More Info/i });
    expect(petCards).toHaveLength(3);
  });

  test("list of Pets refresh correctly", async () => {
    const user = userEvent.setup();
    customRender(
      <BrowserRouter>
        <PetAuthProvider>
          <Home />
        </PetAuthProvider>
      </BrowserRouter>
    );
    expect(screen.getAllByRole("status")).toHaveLength(3);
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
    const petCards = screen.getAllByRole("button", { name: /More Info/i });
    expect(petCards).toHaveLength(3);

    const refreshButton = screen.getByRole("button", { name: /refresh/i });
    await user.click(refreshButton);

    expect(petCards).toHaveLength(3);
  });

  test("list of Pets renders error", async () => {
    server.use(
      http.get("https://api.petfinder.com/v2/animals", () => {
        return HttpResponse.json({ message: "Error" }, { status: 404 });
      })
    );

    customRender(
      <BrowserRouter>
        <PetAuthProvider>
          <Home />
        </PetAuthProvider>
      </BrowserRouter>
    );
    expect(screen.getAllByRole("status")).toHaveLength(3);
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());

    expect(
      screen.getByRole("heading", {
        level: 5,
        name: /Oops! An Error Occurred Getting The Pets/i
      })
    );
  });
});
