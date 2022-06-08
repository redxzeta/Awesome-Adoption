import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { customRouterRender } from "swrconfigtest";

import Profile from "../profile/Profile";

describe("Profile Page", () => {
  test("Profile Loads", async () => {
    customRouterRender(
      <Routes>
        <Route path="profile/:name" element={<Profile />} />
      </Routes>,
      { name: "profileTest", route: "/profile/bob" }
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Loading/i })
    ).toBeInTheDocument();
    await waitForElementToBeRemoved(
      screen.queryByRole("heading", { level: 1, name: /Loading/i })
    );

    expect(screen.getByRole("heading", { level: 5, name: /SupaAwesome/i }));
  });
});
