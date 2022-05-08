import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
  // const [form, handleChange] = useForm(initState);

  const [loginForm, setLoginForm] = useState(loginFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((val) => ({ ...val, [name]: value }));
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
        <h1 className="register__title">Login</h1>
        <Form className="register__form" onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              value={loginForm.email}
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
              value={loginForm.password}
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
      </div>
    </Container>
  );
};

export default SLogin;
