import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ReactDOM from "react-dom";

import Stories from "../Stories";

jest.mock("../Stories");

describe.skip("stories", () => {
  it("renders form without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Stories initShow={true} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should show form modal when Create your story btn is clicked", () => {
    render(<Stories initShow={true} />);
    const modalForm = screen.getByRole(/modalForm/i);
    expect(modalForm).toBeInTheDocument();
  });
});

describe.skip("modal form", () => {
  it("should render text fields correctly", () => {
    render(<Stories initShow={true} />);
    userEvent.type(screen.getByRole("title"), "My story");
    expect(screen.getByRole("title")).toHaveValue("My story");
    userEvent.type(screen.getByRole("desc"), "This is the body of desc");
    expect(screen.getByRole("desc")).toHaveValue("This is the body of desc");
  });

  it("should render selected fields correctly", () => {
    render(<Stories initShow={true} />);
    userEvent.selectOptions(screen.getByRole("country"), ["Afghanistan"]);
    expect(
      screen.getByRole("option", { name: "Afghanistan" }).selected
    ).toBeTruthy();
    userEvent.selectOptions(screen.getByRole("region"), ["Badakhshan"]);
    expect(
      screen.getByRole("option", { name: "Badakhshan" }).selected
    ).toBeTruthy();
  });

  it("clicks in clear button should clear all fields", () => {
    render(<Stories initShow={true} />);
    userEvent.type(screen.getByRole("title"), "My story");
    userEvent.type(screen.getByRole("desc"), "This is the body of desc");
    expect(screen.getByRole(/clearBtn/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole(/clearBtn/i));
    expect(screen.getByRole("title")).toHaveValue("");
    expect(screen.getByRole("desc")).toHaveValue("");
  });

  it("clicks in close button should close the modal form", () => {
    render(<Stories initShow={true} />);
    expect(screen.getByRole(/closeBtn/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole(/closeBtn/i));
  });

  it("before closing the modal form, all fields should be clear", () => {
    render(<Stories initShow={true} />);
    userEvent.type(screen.getByRole("title"), "My story");
    userEvent.type(screen.getByRole("desc"), "This is the body of desc");
    userEvent.selectOptions(screen.getByRole("country"), ["Afghanistan"]);
    userEvent.selectOptions(screen.getByRole("region"), ["Badakhshan"]);
    expect(screen.getByRole(/closeBtn/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole(/closeBtn/i));
    expect(screen.getByRole("title")).toHaveValue("");
    expect(screen.getByRole("desc")).toHaveValue("");
    expect(screen.getByRole("country")).toHaveValue("");
    expect(screen.getByRole("region")).toHaveValue("");
  });

  // it("insert data successfully should close modal form and clear all fields", () => {
  //   render(<Stories initShow={true} success={true} />);
  //   expect(screen.getElementsByName("FetchingButton")).toBeTruthy();
  //   screen.getElementsByName("FetchingButton").click = true;
  //   expect(screen.getByRole("title")).toHaveValue("");
  //   expect(screen.getByRole("desc")).toHaveValue("");
  //   expect(screen.getByRole("country")).toHaveValue("");
  //   expect(screen.getByRole("region")).toHaveValue("");
  // });

  // it("insert data unsuccessfully should not close modal form and remain all fields' values", async () => {
  //   render(<Stories initShow={true} />);
  //   userEvent.type(screen.getByRole("title"), "My story");
  //   userEvent.type(screen.getByRole("desc"), "This is the body of desc");
  //   userEvent.selectOptions(screen.getByRole("country"), ["Afghanistan"]);
  //   userEvent.selectOptions(screen.getByRole("region"), ["Badakhshan"]);
  //   const saveButton = screen.getByRole("button", { name: /Save/i });
  //   expect(saveButton).toBeInTheDocument();
  //   userEvent.click(saveButton);
  //   expect(saveButton);
  //   const LoadingButton = screen.getByRole("button", { name: /Loading.../i });
  //   expect(LoadingButton).toBeDisabled();
  //   await waitForElementToBeRemoved(screen.queryByText(/Loading.../i));
  //   expect(screen.getByRole("title")).toHaveValue("My story");
  //   expect(screen.getByRole("desc")).toHaveValue("This is the body of desc");
  //   expect(screen.getByRole("country")).toHaveValue("Afghanistan");
  //   expect(screen.getByRole("region")).toHaveValue("Badakhshan");
  // });
});
