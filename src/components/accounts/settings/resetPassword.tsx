/* eslint-disable */
// @ts-nocheck
import React, { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useClient } from "react-supabase";

type PasswordType = {
  newPassword: string;
  confirmation: string;
};

const handleValidatePassword = ({
  newPassword,
  confirmation,
}: PasswordType) => {
  if (newPassword !== confirmation) {
    return "Passwords should be equal";
  } else if (newPassword.length < 8) {
    return "Passwords should be more than 8 characters";
  }
  return "";
};

const ResetPassword = () => {
  const { auth } = useClient();
  const session = auth.session();
  const [errorMsg, setErrorMsg] = useState("");
  const handleOnSubmit = async () => {
    setLoading(true);

    const errorMessage = handleValidatePassword(form);
    if (!errorMessage) await handleResetPassword();
    setErrorMsg(errorMessage);
    setLoading(false);
  };

  const [form, setForm] = useState<PasswordType>({
    confirmation: "",
    newPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((val) => ({ ...val, [name]: value }));
  };

  const [loading, setLoading] = useState(false);

  if (!session) {
    return <Navigate to="/" />;
  }

  const handleResetPassword = async () => {
    const { newPassword: password } = form;
    const { error: err } = await auth.api.updateUser(
      auth.currentSession.access_token,
      { password }
    );
    alert(err?.message ? err.message : "Password updated");
  };

  const handleSubmitContent = loading ? (
    <Spinner animation="border" />
  ) : (
    "Reset Password"
  );

  return (
    <Container className="register__container" fluid="md">
      <div className="register__container_form">
        <>
          <h1 className="register__title">Reset Password</h1>
          <Form className="register__form" onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter new password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New password"
                name="newPassword"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Confirm new password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New password"
                name="confirmation"
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              className="register__button mb-2"
              variant="primary"
              type="submit"
            >
              {handleSubmitContent}
            </Button>
            {errorMsg && <small className="text-danger">{errorMsg}</small>}
          </Form>
        </>
      </div>
    </Container>
  );
};

export default ResetPassword;
