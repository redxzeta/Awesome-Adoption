import "./EditProfileModal.css";
import { Button, Modal } from "react-bootstrap";

export default function EditProfileModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Form here</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary">Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
