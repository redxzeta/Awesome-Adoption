import { Fragment, useState } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { Redirect } from "react-router";
import { useResetPassword } from "react-supabase";
import { useAuth } from "../../context/SupaContext";
import useForm from "../../useHooks/useForm";

import "./register.css";

const initState = {
  email: "",
  password: "",
};

const ForgotPassword = () => {
  const [form, handleChange] = useForm(initState);
  const [resetRequestSent, setResetRequestSent] = useState(false);
  const [{ error, fetching }, resetPassword] = useResetPassword();

  const onSubmit = (e) => {
    e.preventDefault();
    resetPassword(form.email).then((response) => {
      if (response) setResetRequestSent(true);
    });
  };
  const errorForm = error ? (
    <small className="text-danger">{error.message}</small>
  ) : (
    ""
  );

  const { session } = useAuth();
  if (session) return <Redirect to="/" />;

  return (
    <Container className="register__container" flud="md">
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
                  value={form.email}
                />
                <Form.Text className="text-muted">
                  We will never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Button
                className="register__button"
                variant="primary"
                type="submit"
                disabled={fetching}
              >
                {fetching ? (
                  <Fragment>
                    Sending reset email...
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Fragment>
                ) : (
                  "Submit"
                )}
              </Button>
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
