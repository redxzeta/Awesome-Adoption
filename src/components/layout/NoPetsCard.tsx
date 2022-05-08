import { Card, Col } from "react-bootstrap";

import missing from "../home/dog.jpg";
import "./NoPetsCard.css";

export default function NoPetsCard() {
  return (
    <Col md={4} xs={12} className="card-container">
      <Card className="card">
        <Card.Header className="card__header">
          <span className="card__title">No Pets Found In Your Area!</span>
        </Card.Header>
        <Card.Img className="card__img" src={missing} />
        <Card.Body className="card__body">
          <Card.Title className="card__title">
            <span className="card__body">
              Please broad your search parameters!
            </span>
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}
