import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { PetListType } from "types/PetType";

import { usePetAuth } from "../../context/TokenContext";
import { fetcher } from "../../utils/petInfoFetcher";
import Bird from "./bird.jpg";
import Cat from "./cat.jpg";
import Dog from "./doggo.jpg";
import Horse from "./horse.jpg";
import "./pets.css";
import Placeholder from "./placeholder.jpg";
import Rabbit from "./rabbit.jpg";

type PetLink = {
  type: PetListType;
  img: string;
};

const linkData: PetLink[] = [
  {
    img: Dog,
    type: "Dog",
  },
  {
    img: Cat,
    type: "Cat",
  },
  {
    img: Bird,
    type: "Bird",
  },
  {
    img: Horse,
    type: "Horse",
  },
  {
    img: Rabbit,
    type: "Rabbit",
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
              type={pet.type.toLowerCase()}
              link={`${pet.type.toLowerCase()}`}
              key={pet.type}
            />
          ))}
          <RandomPet />
        </Row>
      </div>
    </Container>
  );
}

export const AnimalType = ({
  type,
  img,
  link,
}: {
  type: string;
  img: string;
  link: string;
}) => {
  let linkDataTypes: string[] = [];
  linkData.forEach(({ type }) => {
    linkDataTypes = [...linkDataTypes, type];
  });
  const isLinkDataType = linkDataTypes.includes(type);
  return (
    <Col
      xs={12}
      md={6}
      className="pet__column d-flex flex-column align-items-center justify-content-end my-4"
    >
      <Link to={link}>
        <div className="petType">
          <Image
            className={isLinkDataType ? "image__img" : "image__rand_img"}
            src={img}
            alt={type}
            roundedCircle
          />
          <div className="image__overlay image__overlay--primary">
            <div className="image__title">{type}</div>
          </div>
        </div>
      </Link>
      <LinkContainer to={link}>
        <Button className="pet__button my-3" color="primary">
          Click Here
        </Button>
      </LinkContainer>
    </Col>
  );
};

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
  if (error || !data) {
    return <h1>An Error Occurred</h1>;
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
