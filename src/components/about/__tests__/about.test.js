import { render, screen, waitFor } from "@testing-library/react";
import { rest, server } from "../../../testServer";
import React from "react";

import About from "../About";

test("should fetch api and render list", async () => {
  render(<About />);
  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(screen.queryAllByAltText(/Contributor Avatar/i)).toHaveLength(0);
  await waitFor(() =>
    expect(screen.queryByRole("status")).not.toBeInTheDocument()
  );
  const conList = screen.getAllByAltText(/Contributor Avatar/i);
  expect(conList.length).toBe(2);
  expect(conList[0]).toHaveAccessibleName("abe Contributor Avatar");
  expect(conList[1]).toHaveAccessibleName("label Contributor Avatar");
});

test("should fetch api and expect error", async () => {
  server.use(
    rest.get(
      "https://api.github.com/repos/redxzeta/Awesome-Adoption/contributors",
      (_req, res, ctx) => {
        return res(ctx.status(404), ctx.json({ error: "Error" }));
      }
    )
  );

  render(<About />);
  expect(screen.getByRole("status")).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.queryByRole("status")).not.toBeInTheDocument()
  );
  const errorTitle = screen.getByRole("heading", {
    name: /Error Loading/i,
    level: 1,
  });
  // const errorTitle = await screen.getByTitle(/Error Loading/i);
  expect(errorTitle).toBeInTheDocument();
});
