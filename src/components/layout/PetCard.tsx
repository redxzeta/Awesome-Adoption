import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { PetCardType } from "types/PetType";

import { nameCleaner } from "../../utils/utilsCleaner/index";
import placeholder from "../pets/placeholder.jpg";
import PetIcon from "../shared/PetIcon";
import "./PetCard.css";

export default function PetCard(
  props: PetCardType & { children?: React.ReactNode }
) {
  const {
    id,
    photos,
    name,
    type,
    primary_photo_cropped: link,
    breeds,
    children,
  } = props;

  let myInterval: ReturnType<typeof setTimeout>;

  const onHoverPhoto = (event: React.MouseEvent<HTMLImageElement>) => {
    if (photos && photos.length > 1) {
      clearInterval(myInterval);
      let photoIndex = 0;
      myInterval = setInterval(() => {
        (event.target as HTMLImageElement).src = photos[photoIndex].medium;
        if (photoIndex === photos.length - 1) {
          photoIndex = 0;
        } else {
          photoIndex++;
        }
      }, 1000);
    }
  };

  const onBlurPhoto = (event: React.MouseEvent<HTMLImageElement>) => {
    if (photos.length > 1) {
      (event.target as HTMLImageElement).src = photos[0].medium;
      clearInterval(myInterval);
    }
  };

  return (
    <Col md={4} xs={12} key={id} className="card-container flex-column">
      <Card className="card">
        <Card.Header className="card__header">
          <span className="card__title">{nameCleaner(name)}</span>
          <LinkContainer to={`/animal/${id}`}>
            <Button className="card__btn">More Info</Button>
          </LinkContainer>
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
      {children}
    </Col>
  );
}
