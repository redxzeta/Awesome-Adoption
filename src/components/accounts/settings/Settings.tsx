import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useClient } from "react-supabase";

export default function Settings() {
  const { auth } = useClient();
  const session = auth.session();
  if (!session) {
    return <Navigate to="/" />;
  }
  return (
    <Container>
      <h1>Settings</h1>
    </Container>
  );
}
