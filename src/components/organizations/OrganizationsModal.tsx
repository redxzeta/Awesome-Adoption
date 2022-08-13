/* eslint-disable */
// @ts-nocheck
import React, { useState } from "react";
import validator from "validator";

type DonateModalType = {
  show: boolean;
  handleClose: () => void;
};

type DonateForm = {
  name: string;
  website: string;
  logo: string;
  location: string;
  founded: number;
  mission: string;
};

const initialState: DonateForm = {
  name: "",
  website: "",
  logo: "",
  location: "",
  founded: 2022,
  mission: "",
};
export default function DonateModal({ show, handleClose }: DonateModalType) {
  const [nameError, setNameError] = useState(false);
  const [websiteError, setWebsiteError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [foundedError, setFoundedError] = useState(false);
  const [missionError, setMissionError] = useState(false);

  const validCheck = () => {
    if (!form.name || form.name === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (
      !form.website ||
      form.website === "" ||
      !validator.isURL(form.website)
    ) {
      setWebsiteError(true);
    } else {
      setWebsiteError(false);
    }

    if (!form.logo || form.logo === "") {
      setLogoError(true);
    } else {
      setLogoError(false);
    }

    if (!form.location || form.location === "") {
      setLocationError(true);
    } else {
      setLocationError(false);
    }

    if (!form.founded) {
      setFoundedError(true);
    } else {
      setFoundedError(false);
    }

    if (!form.mission || form.mission === "") {
      setMissionError(true);
    } else {
      setMissionError(false);
    }
  };
  const [form, setForm] = useState<DonateForm>(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((val) => ({ ...val, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validCheck();
  };
  // const [form, handleChange, onSubmit] = useForm(initialState, validCheck);
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
