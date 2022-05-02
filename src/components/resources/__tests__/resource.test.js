import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Resources from "../Resources";

describe("Resource", () => {
  test("should Render resource page", async () => {
    render(
      <BrowserRouter>
        <Resources />
      </BrowserRouter>
    );
    expect(screen.getByRole("heading", { name: /Adopting Pets/i, level: 1 }));
  });
});
