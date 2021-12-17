import React from "react";
import { Row, Col, Image, Button, Spinner } from "react-bootstrap";

import "./pets.css";
import Bird from "./bird.jpg";
import Dog from "./doggo.jpg";
import Cat from "./cat.jpg";
import Horse from "./horse.jpg";
import Rabbit from "./rabbit.jpg";
import Placeholder from "./placeholder.jpg";
// import Random from "./random.png";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { usePetAuth } from "../../context/TokenContext";
import { fetcher } from "../../utils/petInfoFetcher";

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

const randomPetURL = "https://api.petfinder.com/v2/animals?limit=1&sort=random";
// const randomIndex = Math.floor(linkData.length * Math.random());
// const type = linkData[randomIndex].type;
// const randomPet = { img: Random, type };
// linkData.push(randomPet);

export default function Pets() {
  let randomPetImage = "";
  const { tokenHeaders } = usePetAuth();

  const { error, data: pet } = useSWR(
    [tokenHeaders ? randomPetURL : null, tokenHeaders],
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  // assigns randomPetImage according to if a photo is available
  if (pet && pet.photos && pet.photos[0]) {
    if (typeof pet.photos[0] === "string") {
      randomPetImage = pet.photos[0];
    } else if (pet.photos[0].large) {
      randomPetImage = String(pet.photos[0].large);
    } else if (pet.photos[0].medium) {
      randomPetImage = pet.photos[0].medium;
    } else {
      randomPetImage = Placeholder;
    }
  } else {
    randomPetImage = Placeholder;
  }

  if (error || (pet && !pet.name)) {
    if (error) {
      return <h1>An Error Occurred</h1>;
    }
    return <h1>No pet data</h1>;
  }
  if (!pet && !error) {
    return (
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
          <Spinner
            animation="grow"
            variant="primary"
            role="status"
            data-testid="spinner-load"
            style={{ padding: "100px", margin: "auto auto" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      </div>
    );
  }

  return (
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
        <AnimalType
          img={randomPetImage}
          type={pet.name}
          link={"/animal/" + pet.id}
          key={pet.type}
        />
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
