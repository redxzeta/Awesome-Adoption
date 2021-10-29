import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";
test("on initial  page", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
});
