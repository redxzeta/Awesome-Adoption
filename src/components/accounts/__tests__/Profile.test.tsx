import { screen, waitFor } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { customRouterRender } from "swrconfigtest";

import Profile from "../profile/Profile";

describe("Profile Page", () => {
  test("loading profile with no favorited Pets", async () => {
    customRouterRender(
      <Routes>
        <Route path="profiles/:name" element={<Profile />} />
      </Routes>,
      { name: "profileTest", route: "/profiles/supaAwesome" }
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Loading/i })
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { level: 1, name: /Loading/i })
      ).not.toBeInTheDocument()
    );
    expect(screen.getByRole("heading", { level: 5, name: /supaAwesome/i }));

    expect(
      screen.getByRole("heading", {
        level: 4,
        name: /You have not marked a pet as a favorite yet/i,
      })
    );
  });
  test("loading profile with favorited Pets", async () => {
    customRouterRender(
      <Routes>
        <Route path="profiles/:name" element={<Profile />} />
      </Routes>,
      { name: "profileTest", route: "/profiles/supaPet" }
    );

    expect(
      screen.getByRole("heading", { level: 1, name: /Loading/i })
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { level: 1, name: /Loading/i })
      ).not.toBeInTheDocument()
    );

    expect(screen.getAllByRole("status")).toHaveLength(3);
    await waitFor(() =>
      expect(screen.queryByRole("status")).not.toBeInTheDocument()
    );

    expect(screen.getByRole("heading", { level: 5, name: /supaPet/i }));

    const petCards = screen.getAllByRole("button", { name: /More Info/i });
    expect(petCards).toHaveLength(2);
  });
});
