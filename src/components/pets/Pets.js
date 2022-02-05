import React from "react";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSWR from "swr";

import { usePetAuth } from "../../context/TokenContext";
import { fetcher } from "../../utils/petInfoFetcher";
import Bird from "./bird.jpg";
import Cat from "./cat.jpg";
import Dog from "./doggo.jpg";
import Horse from "./horse.jpg";
import "./pets.css";
import Placeholder from "./placeholder.jpg";
import Rabbit from "./rabbit.jpg";

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
          <RandomPet />
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

const RandomPet = () => {
  const randomPetURL =
    "https://api.petfinder.com/v2/animals?limit=1&sort=random";
  const { tokenHeaders } = usePetAuth();

  const { error, data } = useSWR(
    tokenHeaders ? [randomPetURL, tokenHeaders] : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );
  const isLoading = !error && !data;

  if (isLoading)
    return (
      <Spinner animation="grow" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  if (error || (data && !data.name)) {
    if (error) {
      return <h1>An Error Occurred</h1>;
    }
    return <h1>No pet data</h1>;
  }

  const randomPetImage = data.photos[0].medium ?? Placeholder;

  // assigns randomPetImage according to if a photo is available
  return (
    <AnimalType
      type={data.name}
      img={randomPetImage}
      link={`/animal/${data.id}`}
    />
  );
};
