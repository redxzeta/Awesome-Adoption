import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PetCard.css";
import placeholder from "../pets/placeholder.jpg";
import nameCleaner from "../../utils/nameCleaner";

export default function PetCard(props) {
  const { id, name, type, primary_photo_cropped: link, breeds } = props.pet;
  return (
    <Col md={4} xs={12} key={id}>
      <Card className="card">
        <Card.Header className="card__header">
          <span className="card__title">{nameCleaner(name)}</span>
          <Button className="card__btn" as={Link} to={`/animal/${id}`}>
            More Info
          </Button>
        </Card.Header>
        <Card.Img
          className="card__img"
          alt={link ? type : `${type} placeholder`}
          src={link?.medium || placeholder}
        />
        <Card.Body className="card__body">
          <Card.Title className="card__title">{breeds.primary}</Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}
