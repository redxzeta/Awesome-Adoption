import { FetchingButton } from "components/layout/Buttons/FetchingButton";
import React, { Fragment, useState } from "react";
import { Container, Form } from "react-bootstrap";
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
    <Container className="register__container pawhub" fluid="md">
      <div className="register__container_form">
        <Fragment>
          <h1 className="register__title">Reset Password</h1>
          {resetRequestSent && !error && !fetching ? (
            <Success />
          ) : (
            <Form className="register__form" onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={forgotPasswordForm.email}
                />
                <Form.Text className="text-muted">
                  We will never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <FetchingButton
                fetching={fetching}
                action="Submit"
                className="register__button"
              />
              {errorForm}
            </Form>
          )}
        </Fragment>
      </div>
    </Container>
  );
};

export default ForgotPassword;

const Success = () => (
  <div>
    <h1>Success</h1>
    <p>Check Email to reset your password</p>
  </div>
);
