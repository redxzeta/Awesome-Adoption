/* eslint-disable */
// @ts-nocheck
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useUpsert } from "react-supabase-next";

import { useAuth } from "../../../context/SupaContext";
import useForm from "../../../useHooks/useForm";
import { ERROR_CODE_23505 } from "../../../utils/SupaErrors";
import { FetchingButton } from "../../layout/Buttons/FetchingButton";

export default function EditProfileModal({ show, handleClose, initialState }) {
  const [usernameError, setUsernameError] = useState(false);
  const { user, changeUserName } = useAuth();
  const validCheck = () => {
    if (!form.username || form.username === "") {
      setUsernameError("Cannot be blank");
    }
    const updates = {
      id: user.id,
      ...form,
      updated_at: new Date(),
    };
    updateProfile(updates);
  };

  const [form, handleChange, onSubmit, resetChanges] = useForm(
    initialState,
    validCheck
  );
  const [{ fetching }, execute] = useUpsert("profiles");

  const updateProfile = async (updates) => {
    try {
      const { error } = await execute(
        updates,
        {
          count: "estimated",
          onConflict: "id",
          returning: "minimal",
        },
        (query) => query.eq("id", user.id)
      );
      if (error) throw error;
      changeUserName(updates.username);
      handleClose();
    } catch (error) {
      if (error.code === "23505") {
        setUsernameError(ERROR_CODE_23505);
      } else {
        setUsernameError(error.message);
      }
    }
  };

  // const [showConfirmation, setShowConfirmation] = useState(false);

  // const handleCloseConfirmation = () => setShowConfirmation(false);
  // const handleShowConfirmation = () => setShowConfirmation(true);

  const onConfirmedExit = () => {
    // handleCloseConfirmation();
    resetChanges();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              isInvalid={usernameError}
            />
            <Form.Control.Feedback type="invalid">
              {usernameError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onConfirmedExit}>
            Cancel
          </Button>
          {/* <Modal
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
              <Button
                variant="dark"
                // onClick={onConfirmedExit}
              >
                Confirm Exit
              </Button>
            </Modal.Footer>
          </Modal> */}
          {/* <Button variant="primary" type="submit">
            Save
          </Button> */}
          <FetchingButton fetching={fetching} action="Save" />
        </Modal.Footer>{" "}
      </Form>
    </Modal>
  );
}
