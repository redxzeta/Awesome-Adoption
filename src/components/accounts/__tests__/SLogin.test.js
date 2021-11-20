import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-supabase";
import { server, supabase, rest } from "../../../testServer";
import { MemoryRouter } from "react-router-dom";
import SLogin from "../SLogin";

test("should show error message for empty fields", async () => {
  const { getByText } = render(
    <Provider value={supabase}>
      <SLogin />
    </Provider>
  );

  fireEvent.click(getByText(/submit/i));

  await waitFor(() => {
    expect(
      screen.getByText(
        /You must provide either an email, phone number or a third-party provider/i
      )
    ).toBeInTheDocument();
  });
});

test("should show error message for incorrect email format", async () => {
  const { getByLabelText, getByText } = render(
    <Provider value={supabase}>
      <SLogin />
    </Provider>
  );

  fireEvent.change(getByLabelText(/email/i), {
    target: { value: "incorrect_format" },
  });

  fireEvent.click(getByText(/submit/i));

  await waitFor(() => {
    expect(
      screen.getByText(/Unable to validate email address: invalid format/i)
    ).toBeInTheDocument();
  });
});

test("wrong password", async () => {
  server.use(
    rest.post("https://test.supabase.co/auth/v1/token", (req, res, ctx) => {
      const { password } = req.body;
      if (password !== "bones1234") {
        return res(
          ctx.status(401),
          ctx.json({
            message: "Wrong Password",
          })
        );
      } else {
        return res(
          ctx.status(200),
          ctx.json({
            message: "Success",
          })
        );
      }
    })
  );
  render(
    <Provider value={supabase}>
      <SLogin />
    </Provider>
  );
  const nameField = screen.getByLabelText(/email/i);
  userEvent.type(nameField, "poodle@woof.com");
  const passwordField = screen.getByLabelText(/password/i);
  userEvent.type(passwordField, "bones1234");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).toBeEnabled();

  userEvent.click(screen.getByText(/submit/i));
  const LoadingButton = screen.getByRole("button", { name: /Loading.../i });
  expect(LoadingButton).toBeDisabled();

  const errorMessage = await screen.findByText(/Wrong Password/i);
  expect(errorMessage).toBeInTheDocument();

  const postButton = screen.getByRole("button", { name: /submit/i });
  expect(postButton).toBeEnabled();
});

test("login success", async () => {
  server.use(
    rest.post("https://test.supabase.co/auth/v1/token", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          access_token: "fake_access_token",
          expires_at: 9999999999,
          expires_in: 9600,
          refresh_token: "cute_doggo",
          token_type: "bearer",
          user: { id: "1234" },
          message: "No message",
        })
      );
    })
  );
  render(
    <Provider value={supabase}>
      <MemoryRouter initialEntries={["/login"]}>
        <SLogin />
      </MemoryRouter>
    </Provider>
  );
  const nameField = screen.getByLabelText(/email/i);
  userEvent.type(nameField, "poodle@woof.com");
  const passwordField = screen.getByLabelText(/password/i);
  userEvent.type(passwordField, "bones1234");
  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).toBeEnabled();

  userEvent.click(screen.getByText(/submit/i));

  const LoadingButton = screen.getByRole("button", { name: /Loading.../i });
  expect(LoadingButton).toBeDisabled();

  const submitPostButton = await screen.findByRole("button", {
    name: /submit/i,
  });
  expect(submitPostButton).toBeInTheDocument();
  expect(submitPostButton).toBeEnabled();
  expect(screen.queryByText(/No message/i)).not.toBeInTheDocument();
});
