import { Button, Card, Col, Row } from "react-bootstrap";

const DonateCard = ({ ch }) => (
  <Card>
    <Row>
      <Col sm={4} className="m-auto">
        <Card.Img
          className="d-block mx-auto img-fluid w-50"
          variant="left"
          src={ch.logo}
        />
      </Col>
      <Col sm={8}>
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
      </Col>
    </Row>
  </Card>
);
export default DonateCard;
