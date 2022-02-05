import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-supabase";

import { rest, server, supabase } from "../../../testServer";
import Register from "../Register";

describe("<Register/>", () => {
  test("should register sucessfully", async () => {
    const { getByLabelText, getByText } = render(
      <Provider value={supabase}>
        <Register />
      </Provider>
    );
    const nameField = screen.getByLabelText(/email/i);
    userEvent.type(nameField, "fake_acc_id");
    const passwordField = screen.getByLabelText(/password/i);
    userEvent.type(passwordField, "fake_password");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeEnabled();

    userEvent.click(submitButton);
    const LoadingButton = screen.getByRole("button", { name: /Loading.../i });
    expect(LoadingButton).toBeDisabled();
    await waitForElementToBeRemoved(screen.getByText(/Loading.../i));
    expect(screen.getByText(/Success/i)).toBeInTheDocument();
  });

  test("should register unsucessfully", async () => {
    server.use(
      rest.post("https://test.supabase.co/auth/v1/signup", (_req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({ error: "Error", message: "Unable To Register" })
        );
      })
    );
    render(
      <Provider value={supabase}>
        <Register />
      </Provider>
    );

    expect(screen.queryByText(/Unable To Register/i)).not.toBeInTheDocument();
    const nameField = screen.getByLabelText(/email/i);
    userEvent.type(nameField, "bad_fake_acc_id@fake.com");
    const passwordField = screen.getByLabelText(/password/i);
    userEvent.type(passwordField, "bad_fake_password");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeEnabled();

    userEvent.click(screen.getByText(/submit/i));
    const LoadingButton = screen.getByRole("button", { name: /Loading.../i });
    expect(LoadingButton).toBeDisabled();

    const errorMessage = await screen.findByText(/Unable To Register/i);
    expect(errorMessage).toBeInTheDocument();

    const postButton = screen.getByRole("button", { name: /submit/i });
    expect(postButton).toBeEnabled();
  });
});
