import React, { useState } from "react";
import { useClient, useResetPassword } from "react-supabase";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const handleValidatePassword = (newPassword, confirmation) => {
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
  const [{ fetching }, resetPassword] = useResetPassword();
  const [errorMsg, setErrorMsg] = useState("");
  const [state, setState] = useState({
    newPassword: "",
    confirmation: "",
  });

  const handleUpdateState = (key) => (e) => {
    setState((prev) => ({ ...prev, [key]: e.target.value }));
  };

  if (!session) {
    return <Redirect to="/" />;
  }

  const handleResetPassword = async () => {
    const { error: err } = await resetPassword(session.user.email);
    alert(err?.message ? err.message : "Password updated");
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmation } = state;
    const errorMessage = handleValidatePassword(newPassword, confirmation);
    if (!errorMessage) {
      handleResetPassword();
    }
    setErrorMsg(errorMessage);
  };

  const handleSubmitContent = fetching ? (
    <Spinner animation="border" />
  ) : (
    "Reset Password"
  );

  return (
    <Container className="register__container" flud="md">
      <div className="register__container_form">
        <>
          <h1 className="register__title">Reset Password</h1>
          <Form className="register__form" onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter new password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New password"
                onChange={handleUpdateState("newPassword")}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Confirm new password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New password"
                onChange={handleUpdateState("confirmation")}
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
