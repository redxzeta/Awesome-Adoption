import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { Provider } from "react-supabase";
import { supabase } from "../../../utils/SupaBaseUtils";

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
