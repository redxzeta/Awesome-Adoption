import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { nameCleaner } from "../../utils/utilsCleaner/index";
import placeholder from "../pets/placeholder.jpg";
import PetIcon from "../shared/PetIcon";
import "./PetCard.css";

export default function PetCard(props) {
  const {
    id,
    photos,
    name,
    type,
    primary_photo_cropped: link,
    breeds,
  } = props.pet;

  let myInterval;

  const onHoverPhoto = (event) => {
    if (photos && photos.length > 1) {
      clearInterval(myInterval);
      let photoIndex = 0;
      myInterval = setInterval(() => {
        event.target.src = photos[photoIndex].medium;
        if (photoIndex === photos.length - 1) {
          photoIndex = 0;
        } else {
          photoIndex++;
        }
      }, 1000);
    }
  };

  const onBlurPhoto = (event) => {
    if (photos && photos.length > 1) {
      event.target.src = photos[0].medium;
      clearInterval(myInterval);
    }
  };

  return (
    <Col md={4} xs={12} key={id} className="card-container">
      <Card className="card">
        <Card.Header className="card__header">
          <span className="card__title">{nameCleaner(name)}</span>
          <Button className="card__btn" as={Link} to={`/animal/${id}`}>
            More Info
          </Button>
        </Card.Header>
        <Link to={`/animal/${id}`}>
          <Card.Img
            className="card__img"
            alt={link ? type : `${type} placeholder`}
            src={link?.medium || placeholder}
            onMouseEnter={onHoverPhoto}
            onMouseLeave={onBlurPhoto}
          />
        </Link>
        <Card.Body className="card__body">
          <Card.Title className="card__title">
            <PetIcon type={type} />
            {breeds.primary}
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
}
