import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useClient } from "react-supabase";
import useSWR from "swr";
import { fetchSupaProfile } from "utils/supaFetcher";

import { useAuth } from "../../../context/SupaContext";
import "./settings.css";

export default function Settings() {
  const client = useClient();
  const { username: profileSearch } = useAuth();
  const settings = { revalidateOnFocus: false };
  const { error: errorProfile, data: profile } = useSWR(
    profileSearch ? [client, profileSearch] : null,
    fetchSupaProfile,
    settings
  );
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (!username && !!profile?.username) setUsername(profile?.username);
    if (!description && !!profile?.description) {
      setDescription(profile?.description);
    }
  }, [profile]);
  if (errorProfile) return <h1>ERROR</h1>;
  if (!profile) return <h1>Loading</h1>;
  // const updateName = () => {
  //   alert(`updated Name: ${username}`);
  // };
  // const updateDescription = () => {
  //   alert(`updated Description: ${description}`);
  // };
  return (
    <Container className={"container"}>
      <h1 className={"title"}>Settings</h1>
      <Form>
        <Form.Group className={"settings-update-area"}>
          <Form.Label className={"label"}>Username</Form.Label>
          <Form.Control
            type="text"
            className={"text-input"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className={"settings-update-area"}>
          <Form.Label className={"label"}>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            className={"text-input"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
