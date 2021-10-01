import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";

import "./pets.css";
import Bird from "./bird.jpg";
import Dog from "./doggo.jpg";
import Cat from "./cat.jpg";
import Horse from "./horse.jpg";
import Rabbit from "./rabbit.jpg";
import { Link, useRouteMatch } from "react-router-dom";

const linkData = [
  {
    img: Dog,
    type: "dog",
  },
  {
    img: Cat,
    type: "cat",
  },
  {
    img: Bird,
    type: "bird",
  },
  {
    img: Horse,
    type: "horse",
  },
  {
    img: Rabbit,
    type: "rabbit",
  },
];
export default function Pets() {
  const { url } = useRouteMatch();
  return (
    <div className="pet__container">
      <h1>Adopt Your Buddy</h1>
      <Row>
        {linkData.map((pet) => (
          <AnimalType
            img={pet.img}
            type={pet.type}
            link={`${url}/${pet.type}`}
            key={pet.type}
          />
        ))}
      </Row>
    </div>
  );
}

export const AnimalType = ({ type, img, link }) => (
  <Col
    xs={12}
    md={6}
    className="pet__column d-flex flex-column align-items-center justify-content-end my-4"
  >
    <div className="image ">
      <Image className="image__img" src={img} alt={type} roundedCircle />
      <div className="image__overlay image__overlay--primary">
        <div className="image__title">{type}</div>
      </div>
    </div>
    <Button as={Link} to={link} className="pet__button my-3" color="primary">
      Click Here
    </Button>
  </Col>
);
