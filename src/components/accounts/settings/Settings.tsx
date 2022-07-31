import { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Toast,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useClient } from "react-supabase";
import useSWR from "swr";
import { supabase } from "utils/SupaBaseUtils";
import { fetchSupaProfile } from "utils/supaFetcher";

import { useAuth } from "../../../context/SupaContext";

export default function Settings() {
  const client = useClient();
  const navigate = useNavigate();
  const { username: profileSearch, user } = useAuth();
  const settings = { revalidateOnFocus: false };
  const { error: errorProfile, data: profile } = useSWR(
    profileSearch ? [client, profileSearch] : null,
    fetchSupaProfile,
    settings
  );
  const toastStatus = {
    SUCCESS: "success",
    ERROR: "danger",
    DEFAULT: "default",
  };
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const [toastState, setToastState] = useState(toastStatus.DEFAULT);
  const [toastMessage, setToastMessage] = useState("");
  const [toastHeader, setToastHeader] = useState("");
  useEffect(() => {
    if (!username && !!profile?.username) setUsername(profile?.username);
    if (!description && !!profile?.description) {
      setDescription(profile?.description);
    }
  }, [description, username, profile]);
  if (errorProfile) {
    navigate("/");
  }
  if (!profile) return <h1>Loading</h1>;
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    setDisabled(true);
    await updateDetails();
    setValidated(true);
    setDisabled(false);
  };
  interface IUpdateObj {
    username?: string;
    description?: string;
  }
  const updateDetails = async () => {
    const updateObj: IUpdateObj = {};
    if (username !== profile?.username) {
      updateObj.username = username;
    }
    if (description !== profile?.description) {
      updateObj.description = description;
    }
    if (Object?.keys(updateObj).length && !!user?.id) {
      const { error } = await supabase
        .from("profiles")
        .update({
          description,
          username,
        })
        .match({ id: user.id });

      if (!!error && !!error.message) {
        setToastState(toastStatus.ERROR);
        setToastHeader("Error");
        setToastMessage(error.message);
      } else {
        setToastState(toastStatus.SUCCESS);
        setToastHeader("Success");
        setToastMessage("Profile updated successfully");
      }
      setShow(true);
    }
  };
  return (
    <Container className={"d-flex flex-column align-items-center"}>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        bg={toastState}
        autohide
      >
        <Toast.Header>{toastHeader}</Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
      <h1>Settings</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a username
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mt-3">
          <Form.Group as={Col}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a description
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Button
            variant="primary"
            disabled={
              !!isDisabled ||
              (username === profile?.username &&
                description === profile?.description)
            }
            type="submit"
            className="justify-content-center mt-3 mb-2"
          >
            {!!isDisabled && (
              <Spinner
                size="sm"
                role="status"
                as="span"
                variant="light"
                animation="border"
              />
            )}{" "}
            Submit
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
