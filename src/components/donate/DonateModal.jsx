import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import validator from "validator";

import useForm from "../../useHooks/useForm";

export default function DonateModal({ show, handleClose }) {
  const [nameError, setNameError] = useState(false);
  const [websiteError, setWebsiteError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [foundedError, setFoundedError] = useState(false);
  const [missionError, setMissionError] = useState(false);

  const initialState = {
    name: "",
    website: "",
    logo: "",
    location: "",
    founded: "",
    mission: "",
  };

  const validCheck = () => {
    if (!form.name || form.name === "") {
      setNameError("Cannot be blank");
    } else {
      setNameError(false);
    }

    if (
      !form.website ||
      form.website === "" ||
      !validator.isURL(form.website)
    ) {
      setWebsiteError("Cannot be blank");
    } else {
      setWebsiteError(false);
    }

    if (!form.logo || form.logo === "") {
      setLogoError("Cannot be blank");
    } else {
      setLogoError(false);
    }

    if (!form.location || form.location === "") {
      setLocationError("Cannot be blank");
    } else {
      setLocationError(false);
    }

    if (!form.founded || form.founded === "") {
      setFoundedError("Cannot be blank");
    } else {
      setFoundedError(false);
    }

    if (!validator.isNumeric(form.founded, { no_symbols: true })) {
      setFoundedError("Not a valid number");
    }

    if (!form.mission || form.mission === "") {
      setMissionError("Cannot be blank");
    } else {
      setMissionError(false);
    }
  };

  const [form, handleChange, onSubmit] = useForm(initialState, validCheck);
  const onConfirmedExit = () => {
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Submit Organization</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              isInvalid={nameError}
            />
            <Form.Control.Feedback type="invalid">
              {nameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              isInvalid={websiteError}
            />
            <Form.Control.Feedback type="invalid">
              {websiteError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Logo</Form.Label>
            <Form.Control
              type="text"
              name="logo"
              value={form.logo}
              onChange={handleChange}
              isInvalid={logoError}
            />
            <Form.Control.Feedback type="invalid">
              {logoError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              isInvalid={locationError}
            />
            <Form.Control.Feedback type="invalid">
              {locationError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>Founded</Form.Label>
            <Form.Control
              type="text"
              name="founded"
              value={form.founded}
              onChange={handleChange}
              isInvalid={foundedError}
            />
            <Form.Control.Feedback type="invalid">
              {foundedError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Mission</Form.Label>
            <Form.Control
              as="textarea"
              name="mission"
              rows={3}
              value={form.mission}
              onChange={handleChange}
              isInvalid={missionError}
            />
            <Form.Control.Feedback type="invalid">
              {missionError}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onConfirmedExit}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>{" "}
      </Form>
    </Modal>
  );
}
