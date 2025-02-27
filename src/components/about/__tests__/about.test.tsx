import { screen, waitFor } from "@testing-library/react";

import { customRender } from "../../../swrconfigtest";
import { server } from "../../../testServer";
import About from "../About";
import { http, HttpResponse } from "msw";

describe("<About/>", () => {
  test("should fetch api and expect error", async () => {
    server.use(
      http.get("https://api.github.com/repos/redxzeta/Awesome-Adoption/contributors", () => {
        return HttpResponse.json({ message: "Error" }, { status: 404 });
      })
    );

    customRender(<About />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
    const errorTitle = screen.getByRole("heading", {
      name: /Error Loading/i,
      level: 1
    });

    expect(errorTitle).toBeInTheDocument();
  });

  test("should fetch api and render list", async () => {
    customRender(<About />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    const avatarAltTexts = screen.queryByAltText(/Contributor Avatar/i);
    expect(avatarAltTexts).not.toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
    const conList = screen.getAllByAltText(/Contributor Avatar/i);
    expect(conList.length).toBe(2);
    expect(conList[0]).toHaveAccessibleName("abe Contributor Avatar");
    expect(conList[1]).toHaveAccessibleName("label Contributor Avatar");
  });
});
