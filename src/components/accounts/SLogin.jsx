import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-supabase";

import useForm from "../../useHooks/useForm";
import { FetchingButton } from "../layout/Buttons/FetchingButton";

const initState = {
  email: "",
  password: "",
};
const SLogin = () => {
  const navigate = useNavigate();
  const [form, handleChange] = useForm(initState);

  const [{ error, fetching }, signIn] = useSignIn();

  const onSubmit = async (e) => {
    e.preventDefault();

    const { session } = await signIn(form);

    if (!error && !fetching && session) {
      navigate("/");
    }
  };

  return (
    <Container className="register__container pawhub" flud="md">
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
              value={form.email}
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
              value={form.password}
            />
          </Form.Group>
          <FetchingButton
            fetching={fetching}
            action="Submit"
            type="submit"
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
