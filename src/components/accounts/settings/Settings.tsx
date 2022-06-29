import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
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
  const updateName = () => {
    alert(`updated Name: ${username}`);
  };
  const updateDescription = () => {
    alert(`updated Description: ${description}`);
  };
  return (
    <Container className={"container"}>
      <h1 className={"title"}>Settings</h1>
      <div className={"settings-update-area"}>
        <label className={"label"}>Username</label>
        <input
          className={"text-input"}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={updateName}>Update Username</button>
      </div>
      <div className={"settings-update-area"}>
        <label className={"label"}>Description</label>
        <textarea
          className={"text-input"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={updateDescription}>Update Description</button>
      </div>
    </Container>
  );
}
