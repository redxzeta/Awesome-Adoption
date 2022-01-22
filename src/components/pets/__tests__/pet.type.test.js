import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PetType from "../PetType";
import userEvent from "@testing-library/user-event";

describe("Test zipcode search", () => {
  test("check init zipcode", async () => {
    render(
      <BrowserRouter>
        <PetType />
      </BrowserRouter>
    );
    const goZip = await screen.findByRole("button", { name: /Go/i });
    expect(goZip).toBeInTheDocument();

    expect(goZip).toBeEnabled();

    const zipForm = screen.getByLabelText(/zipcode/i);
    expect(zipForm).toHaveValue("19019");
  });

  // test("no value zipcode disabled", async () => {
  //   render(
  //     <BrowserRouter>
  //       <PetType />
  //     </BrowserRouter>
  //   );
  //   const zipForm = screen.getByLabelText(/zipcode/i);
  //   userEvent.clear(zipForm);
  //   expect(zipForm).toHaveValue("");
  //   const goZip = await screen.findByRole("button", { name: /Go/i });
  //   expect(goZip).toBeDisabled();
  // });
});
