import React, { Fragment, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
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
  let labelEle = document.querySelector('label');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClickSignUp();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((val) => ({ ...val, [name]: value }));

    if (e.target.value !== "") {
      labelEle?.classList.add("active-label");
    } else {
      labelEle?.classList.remove("active-label");
    }
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
            <div className="register__form__title">
              <h1 className="register__title">Sign up with your email</h1>
              <span className="register__title__span">
                <p>Already have an account? </p>
                <Link to="/login">
                  <a>Sign in</a>
                </Link>
              </span>
            </div>

            <Form className="register__form" onSubmit={onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={registerForm.email}
                />
                <Form.Label>Email address</Form.Label>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={registerForm.password} />
                <Form.Label>Password</Form.Label>
              </Form.Group>

              <Form.Text className="text-muted">
                * We will never share your email with anyone else.
              </Form.Text>

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
