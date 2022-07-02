import { FormEvent, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useClient } from "react-supabase";
import useSWR from "swr";
import { fetchSupaProfile } from "utils/supaFetcher";

import { useAuth } from "../../../context/SupaContext";
import "./settings.css";

export default function Settings() {
  const client = useClient();
  const { username: profileSearch, user } = useAuth();
  const settings = { revalidateOnFocus: false };
  const { error: errorProfile, data: profile } = useSWR(
    profileSearch ? [client, profileSearch] : null,
    fetchSupaProfile,
    settings
  );
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);
  console.log("useAuth: ", useAuth());
  useEffect(() => {
    if (!username && !!profile?.username) setUsername(profile?.username);
    if (!description && !!profile?.description) {
      setDescription(profile?.description);
    }
  }, [profile]);
  if (errorProfile) return <h1>ERROR</h1>;
  if (!profile) return <h1>Loading</h1>;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    updateDetails();
    event.preventDefault();
    setValidated(true);
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
    if (Object.keys(updateObj).length && !!user?.id) {
      try {
        const { data, error } = await client.auth.update({
          data: {
            description,
            username,
          },
        });
        console.log("error: ", error);
        console.log("data: ", data);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <Container className={"container"}>
      <h1 className={"title"}>Settings</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} className={"settings-update-area"}>
            <Form.Label className={"label"}>Username</Form.Label>
            <Form.Control
              required
              type="text"
              className={"text-input"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a username
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className={"settings-update-area"}>
            <Form.Label className={"label"}>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              className={"text-input"}
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
            type="submit"
            className="justify-content-center mt-3 mb-2"
          >
            Submit
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
