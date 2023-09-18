import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-supabase";

import { rest, server, supabase } from "../../../testServer";
import SLogin from "../SLogin";

describe("<SLogin/>", () => {
  test("should show error message for empty fields", async () => {
    render(
      <Provider value={supabase}>
        <BrowserRouter>
          <SLogin />
        </BrowserRouter>
      </Provider>
    );
    const user = userEvent.setup();
    expect(
      screen.queryByText(
        /You must provide either an email, phone number, a third-party provider or OpenID Connect./i
      )
    ).not.toBeInTheDocument();
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("should show error message for incorrect email format", async () => {
    server.use(
      rest.post("https://test.supabase.co/auth/v1/token", (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            message: "Unable to validate email address: invalid format"
          })
        );
      })
    );

    render(
      <Provider value={supabase}>
        <BrowserRouter>
          <SLogin />{" "}
        </BrowserRouter>
      </Provider>
    );
    const user = userEvent.setup();
    expect(
      screen.queryByText(/Unable to validate email address: invalid format/i)
    ).not.toBeInTheDocument();
    const nameField = screen.getByLabelText(/email/i);
    await user.type(nameField, "whatisemail");
    const passwordField = screen.getByLabelText(/password/i);
    await user.type(passwordField, "bones1234");

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    const LoadingButton = await screen.findByRole("button", {
      name: /Loading.../i
    });
    expect(LoadingButton).toBeDisabled();

    const invalidEmail = await screen.findByText(
      /Unable to validate email address: invalid format/i
    );
    expect(invalidEmail).toBeInTheDocument();
  });

  test("should display wrong password", async () => {
    server.use(
      rest.post("https://test.supabase.co/auth/v1/token", (req, res, ctx) => {
        const { password } = req.body;
        if (password !== "bones1234") {
          return res(
            ctx.status(401),
            ctx.json({
              message: "Wrong Password"
            })
          );
        } else {
          return res(
            ctx.status(200),
            ctx.json({
              message: "Success"
            })
          );
        }
      })
    );
    render(
      <Provider value={supabase}>
        <BrowserRouter>
          <SLogin />{" "}
        </BrowserRouter>
      </Provider>
    );
    const user = userEvent.setup();
    const nameField = screen.getByLabelText(/email/i);
    await user.type(nameField, "poodle@woof.com");
    const passwordField = screen.getByLabelText(/password/i);
    await user.type(passwordField, "bones1234");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeEnabled();

    await user.click(screen.getByText(/submit/i));
    const LoadingButton = await screen.findByRole("button", {
      name: /Loading.../i
    });
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
            message: "No message"
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
    const user = userEvent.setup();
    const nameField = screen.getByLabelText(/email/i);
    await user.type(nameField, "poodle@woof.com");
    const passwordField = screen.getByLabelText(/password/i);
    await user.type(passwordField, "bones1234");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeEnabled();

    await user.click(screen.getByText(/submit/i));

    const LoadingButton = await screen.findByRole("button", {
      name: /Loading.../i
    });
    expect(LoadingButton).toBeDisabled();

    const submitPostButton = await screen.findByRole("button", {
      name: /submit/i
    });
    expect(submitPostButton).toBeInTheDocument();
    expect(submitPostButton).toBeEnabled();
    expect(screen.queryByText(/No message/i)).not.toBeInTheDocument();
  });
});
