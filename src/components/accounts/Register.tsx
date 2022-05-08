import React, { Fragment, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useSignUp } from "react-supabase";

import { useAuth } from "../../context/SupaContext";
import { FetchingButton } from "../layout/Buttons/FetchingButton";
import "./register.css";

type RegisterType = {
  email: string;
  password: string;
};

const registerFormState: RegisterType = {
  email: "",
  password: "",
};
const Register = () => {
  const [registerForm, setRegisterForm] = useState(registerFormState);
  const [{ error, fetching, user }, signUp] = useSignUp();

  const onClickSignUp = async () => signUp(registerForm);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClickSignUp();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((val) => ({ ...val, [name]: value }));
  };

  const { session } = useAuth();
  if (session) return <Navigate to="/" />;
  return (
    <Container className="register__container pawhub" fluid="md">
      <div className="register__container_form">
        {user ? (
          <Success />
        ) : (
          <Fragment>
            <h1 className="register__title">Sign Up</h1>
            <Form className="register__form" onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={registerForm.email}
                />
                <Form.Text className="text-muted">
                  We will never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={registerForm.password}
                />
              </Form.Group>
              <FetchingButton
                fetching={fetching}
                action="Submit"
                className="register__button"
              />
              {error && (
                <small className="text-danger" test-id="formErrorMessage">
                  {error.message}
                </small>
              )}
            </Form>
          </Fragment>
        )}
      </div>
    </Container>
  );
};

export default Register;

const Success = () => (
  <div>
    <h1>Success</h1>
    <p>Check Email to confirm your account</p>
  </div>
);
