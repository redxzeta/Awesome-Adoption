import { Card, Button } from "react-bootstrap";

const DonateCard = ({ ch }) => (
  <Card>
    <Card.Img variant="top" src={ch.logo} />
    <Card.Body>
      <Card.Title>{ch.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        Location: {ch.location}
      </Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">
        Founded: {ch.founded}
      </Card.Subtitle>
      <Card.Text>{ch.mission}</Card.Text>
      <Button variant="primary" href={ch.website} target="_blank">
        Click Here
      </Button>
    </Card.Body>
  </Card>
);
export default DonateCard;
