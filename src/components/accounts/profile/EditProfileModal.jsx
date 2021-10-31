import "./EditProfileModal.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";

export default function EditProfileModal({ show, handleClose }) {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || username === "") {
      setUsernameError("Username cannot be blank!");
    } else {
      // No errors
      console.log("Passed validation!", {
        username: username,
        description: description,
      });
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
              }}
              isInvalid={!!usernameError}
            />
            <Form.Control.Feedback type="invalid">
              {usernameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" onClick={onSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
