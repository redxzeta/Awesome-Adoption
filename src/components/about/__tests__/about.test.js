import { render, screen, waitFor, act } from "@testing-library/react";
import { rest, server } from "../../../testServer";
import React from "react";

import About from "../About";

test("should fetch api and render list", async () => {
  const { getByTestId, queryAllByTestId } = render(<About />);
  expect(getByTestId("loading")).toBeInTheDocument();
  await waitFor(() => {
    const conList = queryAllByTestId("contributor-list");

    expect(conList.length).toBe(2);
    conList.forEach((y) => expect(y).toBeInTheDocument());
    // expect(x).toBeInTheDocument();
  });
});
test("should fetch api and expect error", async () => {
  server.use(
    rest.get(
      "https://api.github.com/repos/redxzeta/Awesome-Adoption/contributors",
      (_req, res, ctx) => {
        return res(ctx.status(404));
      }
    )
  );

  const { getByTestId } = render(<About />);
  expect(getByTestId("loading")).toBeInTheDocument();
  await waitFor(() => {
    expect(getByTestId("error")).toBeInTheDocument();
    const msg = screen.getByText(/Error Loading/i);
    expect(msg).toBeInTheDocument();
  });
});
