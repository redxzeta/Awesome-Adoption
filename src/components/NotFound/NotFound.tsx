import { Container, Image } from "react-bootstrap";

import Dog from "../home/dog.jpg";

export default function NotFound() {
  return (
    <Container className="d-flex flex-column justify-center align-items-center">
      <Image src={Dog} rounded fluid />

      <h1>Page Not Found</h1>
    </Container>
  );
}
