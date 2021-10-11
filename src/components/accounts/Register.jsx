import { Form, Button, Container } from "react-bootstrap";
import useForm from "../../useHooks/useForm";
import "./register.css";

const initState = {
  email: "",
  password: "",
};

const Register = () => {
  const userRegister = () => console.log(form);
  const [form, handleChange, onSubmit] = useForm(initState, userRegister);
  return (
    <Container id="container" flud="md">
      <div id="form-container">
        <h1 id="form-title">Sign Up</h1>
        <Form id="form" onSubmit={onSubmit}>
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
          <Button id="submit-button" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
