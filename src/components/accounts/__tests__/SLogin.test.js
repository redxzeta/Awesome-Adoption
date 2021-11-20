import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event/dist/utils";
import React from "react";
import { Provider } from "react-supabase";
import { server, supabase, rest } from "../../../testServer";

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

// test("login should be successful", async () => {
//   render(
//     <Provider value={supabase}>
//       <SLogin />
//     </Provider>
//   );

//   const nameField = screen.getByLabelText(/email/i);
//   userEvent.type(nameField, "jojo@yareyare.com");
//   const passwordField = screen.getByLabelText(/password/i);
//   userEvent.type(passwordField, "not_a_jojo_reference");
//   const submitButton = screen.getByRole("button", { name: /submit/i });
//   expect(submitButton).toBeEnabled();

//   userEvent.click(screen.getByText(/submit/i));
//   await waitFor(() => {
//     const LoadingButton = screen.getByRole("button", {
//       name: /Loading.../i,
//     });
//     expect(LoadingButton).toBeDisabled();
//   });

// const postButton = screen.getByRole("button", { name: /submit/i });
// expect(postButton).toBeEnabled();
// await waitFor(() => {
//   expect(
//     screen.getByText(/Unable to validate email address: invalid format/i)
//   ).toBeInTheDocument();
// });
// const LoadingButton = screen.getByRole("button", { name: /Loading.../i });
// expect(LoadingButton).toBeDisabled();
// });
