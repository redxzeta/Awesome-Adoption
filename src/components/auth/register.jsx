import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./auth.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function register(e) {
    e.preventDefault();
    if (username.length > 4 && password.length > 8) {
      alert("function");
    } else if (username.length <= 4) {
      alert("Your username must be 4 characters long");
    } else if (password.length <= 8) {
      alert("Your username must be 8 characters long");
    }
  }

  return (
    <Form className="form_container" onSubmit={register}>
      <h1 className="heading">Register</h1>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" value="Submit">
        Register
      </Button>
    </Form>
  );
}
