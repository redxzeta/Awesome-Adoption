import React from "react";
import { Button, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
// import Dog from "./dog.jpg";
import "./home.css";
import PetCard from "../layout/PetCard";
import LoadPlaceHolder from "../shared/PlaceHolderCard";
import { usePetAuth } from "../../context/TokenContext";
import { randomPetsList } from "../../routes/API";
import { fetcher } from "../../utils/homePageFetcher";
import useSWR from "swr";

export default function Home() {
  const { tokenHeaders } = usePetAuth();
  const {
    error,
    data: petList,
    mutate,
  } = useSWR([tokenHeaders ? randomPetsList : null, tokenHeaders], fetcher);

  return (
    <>
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
        <div className="featured__pets">
          <h2>Featured Pets</h2>
          {error ? (
            <h5>Oops! An Error Occurred Getting The Pets</h5>
          ) : !petList ? (
            <Container>
              <Row>
                <h4>Loading...</h4>
              </Row>
              <Row>
                <LoadPlaceHolder />
                <LoadPlaceHolder />
                <LoadPlaceHolder />
              </Row>
            </Container>
          ) : (
            <Container>
              <Row>
                {petList.map((pet, index) => (
                  <PetCard key={index} pet={pet} />
                ))}
              </Row>
            </Container>
          )}
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
      </div>
    </>
  );
}
