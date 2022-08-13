import { FetchingButton } from "components/layout/Buttons/FetchingButton";
import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import React, { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import { useResetPassword } from "react-supabase";

import { useAuth } from "../../context/SupaContext";

type ForgotPasswordType = {
  email: string;
};

const initState: ForgotPasswordType = {
  email: "",
};

const ForgotPassword = () => {
  const [forgotPasswordForm, setForgotPasswordForm] = useState(initState);
  const [resetRequestSent, setResetRequestSent] = useState(false);
  const [{ error, fetching }, resetPassword] = useResetPassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setForgotPasswordForm((v) => ({ ...v, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(forgotPasswordForm.email).then((response) => {
      if (response) setResetRequestSent(true);
    });
  };
  const errorForm = error ? (
    <small className="text-danger">{error.message}</small>
  ) : (
    ""
  );

  const { session } = useAuth();
  if (session) return <Navigate to="/" />;

  return (
    <PawHubContainer>
      <div className="register__PawHubContainer_form">
        <Fragment>
          <h1 className="register__title">Reset Password</h1>
          {resetRequestSent && !error && !fetching ? (
            <Success />
          ) : (
            <form className="register__form" onSubmit={onSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={forgotPasswordForm.email}
                />
                <span className="text-muted">
                  We will never share your email with anyone else.
                </span>
              </div>

              <FetchingButton
                fetching={fetching}
                action="Submit"
                className="register__button"
              />
              {errorForm}
            </form>
          )}
        </Fragment>
      </div>
    </PawHubContainer>
  );
};

export default ForgotPassword;

const Success = () => (
  <div>
    <h1>Success</h1>
    <p>Check Email to reset your password</p>
  </div>
);
