import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-supabase";

import { FetchingButton } from "../layout/Buttons/FetchingButton";

type LoginType = {
  email: string;
  password: string;
};

const loginFormState: LoginType = {
  email: "",
  password: "",
};

const SLogin = () => {
  const navigate = useNavigate();
  const labelEle = document.querySelector("label");

  const [loginForm, setLoginForm] = useState(loginFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((val) => ({ ...val, [name]: value }));

    if (e.target.value !== "") {
      labelEle?.classList.add("active-label");
    } else {
      labelEle?.classList.remove("active-label");
    }

    console.log(e.target.value);

  };

  const [{ error, fetching }, signIn] = useSignIn();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { session } = await signIn(loginForm);

    if (!error && !fetching && session) {
      navigate("/");
    }
  };

  return (
    <Container className="register__container pawhub" fluid="md">
      <div className="register__container_form">
        <div className="register__form__title">
          <h1 className="register__title">Sign in with your email</h1>
          <span className="register__title__span">
            <p>Don't have an account?</p>
            <Link to="/register">
              <a>Sign up</a>
            </Link>
          </span>
        </div>

        <Form className="register__form" onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              value={loginForm.email}
            />
            <Form.Label>Email address</Form.Label>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              value={loginForm.password}
            />
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
      </div>
    </Container>
  );
};

export default SLogin;
