import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import React from "react";
import { Provider } from "react-supabase";
import { supabase } from "../../../utils/SupaBaseUtils";

import Register from "../Register";

test("should register sucessfully", async () => {
  const { getByLabelText, getByText } = render(
    <Provider value={supabase}>
      <Register />
    </Provider>
  );

  fireEvent.change(getByLabelText(/email/i), {
    target: { value: "fake_acc_id" },
  });
  fireEvent.change(getByLabelText(/password/i), {
    target: { value: "fake_password" },
  });

  fireEvent.click(getByText(/submit/i));

  await waitFor(() => {
    expect(screen.getByText(/Success/i)).toBeInTheDocument();
  });
});
