import React from "react";
import { Row, Col, Image, Button, Container } from "react-bootstrap";

import "./pets.css";
import Bird from "./bird.jpg";
import Dog from "./doggo.jpg";
import Cat from "./cat.jpg";
import Horse from "./horse.jpg";
import Rabbit from "./rabbit.jpg";
// import Random from "./random.png";
import { Link } from "react-router-dom";

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
// const randomIndex = Math.floor(linkData.length * Math.random());
// const type = linkData[randomIndex].type;
// const randomPet = { img: Random, type };
// linkData.push(randomPet);

export default function Pets() {
  return (
    <Container className="pawhub">
      <div className="pet__container">
        <h1>Adopt Your Buddy</h1>
        <Row>
          {linkData.map((pet) => (
            <AnimalType
              img={pet.img}
              type={pet.type}
              link={`${pet.type}`}
              key={pet.type}
            />
          ))}
        </Row>
      </div>
    </Container>
  );
}

export const AnimalType = ({ type, img, link }) => (
  <Col
    xs={12}
    md={6}
    className="pet__column d-flex flex-column align-items-center justify-content-end my-4"
  >
    <Link to={link}>
      <div className="petType">
        <Image className="image__img" src={img} alt={type} roundedCircle />
        <div className="image__overlay image__overlay--primary">
          <div className="image__title">{type}</div>
        </div>
      </div>
    </Link>
    <Button as={Link} to={link} className="pet__button my-3" color="primary">
      Click Here
    </Button>
  </Col>
);
