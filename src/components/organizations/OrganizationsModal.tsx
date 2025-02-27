import React, { useState } from "react";
import { Button, Form, Join, Modal } from "react-daisyui";

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
  mission: ""
};
export default function DonateModal({ handleClose }: DonateModalType) {
  const [form, setForm] = useState<DonateForm>(initialState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(val => ({ ...val, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  // const [form, handleChange, onSubmit] = useForm(initialState, validCheck);
  const onConfirmedExit = () => {
    handleClose();
  };

  return (
    <Modal>
      <Modal.Header>Submit Organization</Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Join className="mb-3">
            <Form.Label>Organization Name</Form.Label>
            <input type="text" name="name" value={form.name} onChange={handleChange} />
          </Join>
          <Join className="mb-3">
            <Form.Label>Website</Form.Label>
            <input type="text" name="website" value={form.website} onChange={handleChange} />
          </Join>
          <Join className="mb-3">
            <Form.Label>Logo</Form.Label>
            <input type="text" name="logo" value={form.logo} onChange={handleChange} />
          </Join>
          <Join className="mb-3">
            <Form.Label>Location</Form.Label>
            <input type="text" name="location" value={form.location} onChange={handleChange} />
          </Join>
          <Join className="mb-3">
            <Form.Label>Founded</Form.Label>
            <input type="text" name="founded" value={form.founded} onChange={handleChange} />
          </Join>
          <Join className="mb-3">
            <Form.Label>Mission</Form.Label>
            <input type="textarea" name="mission" className={"h-3"} value={form.mission} onChange={handleChange} />
          </Join>
          <Button className="btn btn-secondary" onClick={onConfirmedExit}>
            Cancel
          </Button>
          <Button className="btn btn-primary" type="submit">
            Submit
          </Button>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
