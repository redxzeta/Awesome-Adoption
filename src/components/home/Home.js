import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSWR from "swr";

import { usePetAuth } from "../../context/TokenContext";
import { randomPetsList } from "../../routes/API";
import { fetcher } from "../../utils/homePageFetcher";
import PetCard from "../layout/PetCard";
import LoadPlaceHolder from "../shared/PlaceHolderCard";
// import Dog from "./dog.jpg";
import "./home.css";

export default function Home() {
  return (
    <Container fluid className="pawhub">
      <div className="home__container">
        <Container fluid className="hero">
          <div className="dark__overlay">
            <h1>Get a BFF</h1>
            <h1>For now and forever</h1>
          </div>
        </Container>
        <h2>Adopt a Buddy Today!</h2>
        <Button as={Link} to="/pets" variant="primary">
          Adopt
        </Button>
        <LoadingPetCards />
      </div>
    </Container>
  );
}

const LoadingPetCards = () => {
  const { tokenHeaders } = usePetAuth();
  const {
    error,
    data: petList,
    mutate,
  } = useSWR(tokenHeaders ? [randomPetsList, tokenHeaders] : null, fetcher);

  const isLoading = !error && !petList;
  if (isLoading)
    return (
      <Container>
        <Row>
          <LoadPlaceHolder />
          <LoadPlaceHolder />
          <LoadPlaceHolder />
        </Row>
      </Container>
    );
  if (error)
    return (
      <>
        <h5>Oops! An Error Occurred Getting The Pets</h5>{" "}
        <Button
          variant="primary"
          className="refresh"
          onClick={async () => {
            mutate(petList, { error, petList }, false);
          }}
        >
          Refresh
        </Button>
      </>
    );
  return (
    <>
      <div className="featured__pets">
        <h2>Featured Pets</h2>

        <Container>
          <Row className="fadeInUp">
            {petList.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </Row>
        </Container>
      </div>
      <Button
        variant="primary"
        className="refresh"
        onClick={async () => {
          mutate(petList, { error, petList }, false);
        }}
      >
        Refresh
      </Button>
    </>
  );
};
