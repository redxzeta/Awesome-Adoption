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
  email: ""
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
          <h1 className="text-5xl font-bold font-amatic">Reset Password</h1>
          {resetRequestSent && !error && !fetching ? (
            <Success />
          ) : (
            <form className="register__form" onSubmit={onSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  color="primary"
                  className="input input-bordered w-full max-w-xs mt-4 mb-2 flex min-w-[10px] input-primary focus:outline-offset-0"
                  onChange={handleChange}
                  value={forgotPasswordForm.email}
                />
                <p className="text-muted">
                  We will never share your email with anyone else.
                </p>
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
  <div className="alert alert-success shadow-lg mt-4 justify-start">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-current flex-shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>Success! Check Email to reset your password.</span>
  </div>
);
