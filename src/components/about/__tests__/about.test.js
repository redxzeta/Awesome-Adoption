import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest, server } from "../../../testServer";
import React from "react";

import About from "../About";

test("should fetch api and render list", async () => {
  render(<About />);
  expect(screen.getByRole("status")).toBeInTheDocument();
  const conList = await screen.findAllByAltText(/Contributor Avatar/i);
  expect(conList.length).toBe(2);
  conList.forEach((y) => expect(y).toBeInTheDocument());
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

  // const errorTitle = await screen.getByTitle(/Error Loading/i);
  // expect(errorTitle).toBeInTheDocument()
});
