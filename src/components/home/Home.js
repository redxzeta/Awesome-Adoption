import React from "react";
import { Button, Image, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dog from "./dog.jpg";
import "./home.css";
import PetCard from "../layout/PetCard";
import LoadPlaceHolder from "../shared/PlaceHolderCard";
import { usePetAuth } from "../../context/TokenContext";
import { randomPetsList } from "../../routes/API";
import { fetcher } from "../../utils/homePageFetcher";
import useSWR, { useSWRConfig } from "swr";

export default function Home() {
  const { tokenHeaders } = usePetAuth();
  const { mutate } = useSWRConfig();

  const { error, data: petList } = useSWR(
    [tokenHeaders ? randomPetsList : null, tokenHeaders],
    fetcher
  );

  const renderCards = () => {
    return petList && !error ? (
      petList.map((pet, index) => <PetCard key={index} pet={pet} />)
    ) : (
      <Container>
        <Row>
          <LoadPlaceHolder />
          <LoadPlaceHolder />
          <LoadPlaceHolder />
        </Row>
      </Container>
    );
  };

  return (
    <div className="home__container">
      <Image src={Dog} alt="doggo" roundedCircle className="shadow" id="dog" />
      <h2>Adopt a Buddy Today!</h2>
      <Button as={Link} to="/pets" variant="primary">
        Adopt
      </Button>
      <div className="featured__pets">
        <h2>Featured Pets</h2>
        {error || !petList ? (
          <Container>
            <Row>
              <h5>Oops! An Error Occurred Getting The Pets</h5>
            </Row>
            <Row>
              <h6>
                Apparently we had an internal error, please try again later!
              </h6>
            </Row>
          </Container>
        ) : (
          <Container>
            <Row>{renderCards()}</Row>
          </Container>
        )}
      </div>
      <Button
        variant="primary"
        className="refresh"
        data-testid="btn-refresh"
        onClick={async () => {
          mutate(randomPetsList, { ...error, ...petList }, false);
        }}
      >
        Refresh
      </Button>
    </div>
  );
}
