import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";

export default function EditProfileModal({ show, handleClose }) {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [savedProfile, setSavedProfile] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleShowConfirmation = () => setShowConfirmation(true);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || username === "") {
      setUsernameError("Username cannot be blank!");
    } else {
      // No errors:
      const newProfile = {
        username: username,
        description: description,
      };

      setSavedProfile(newProfile);
      console.log("Passed validation! Profile: ", newProfile);
      handleClose();
    }
  };

  const onConfirmedExit = (e) => {
    e.preventDefault();

    // Revert any changes made to profile
    setUsername(savedProfile.username || "");
    setDescription(savedProfile.description || "");

    handleCloseConfirmation();
    handleClose();
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
        <Button variant="secondary" onClick={handleShowConfirmation}>
          Cancel
        </Button>
        <Modal
          show={showConfirmation}
          onHide={handleCloseConfirmation}
          backdrop="static"
          keyboard={false}
          centered
          size="sm"
        >
          <Modal.Header>
            <Modal.Title>Exit Editing?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmation}>
              Back
            </Button>
            <Button variant="dark" onClick={onConfirmedExit}>
              Confirm Exit
            </Button>
          </Modal.Footer>
        </Modal>
        <Button variant="primary" onClick={onSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
