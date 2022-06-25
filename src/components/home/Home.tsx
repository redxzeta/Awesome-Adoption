import { Button, Container, Row } from "react-bootstrap";
import { Hero } from "react-daisyui";
import { LinkContainer } from "react-router-bootstrap";
import useSWR from "swr";
import { PetSearchType } from "utils/petTypeFetcher";

import { usePetAuth } from "../../context/TokenContext";
import { randomPetsList } from "../../routes/API";
import { fetcher } from "../../utils/homePageFetcher";
import PetCard from "../layout/PetCard";
import LoadPlaceHolder from "../shared/PlaceHolderCard";
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

        <LinkContainer to="/pets">
          <Button variant="primary">Adopt</Button>
        </LinkContainer>
        <LoadingPetCards />
      </div>
      <Hero></Hero>
    </Container>
  );
}

const LoadingPetCards = () => {
  const { tokenHeaders } = usePetAuth();
  const {
    error,
    data: petList,
    mutate,
  } = useSWR(tokenHeaders ? [randomPetsList, tokenHeaders] : null, fetcher, {
    revalidateOnFocus: false,
  });
  const mutatePetlist = async () => mutate({} as PetSearchType);
  const isLoading = !error && !petList?.animals;
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
  if (error || !petList)
    return (
      <>
        <h5>Oops! An Error Occurred Getting The Pets</h5>{" "}
        <Button variant="primary" className="refresh" onClick={mutatePetlist}>
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
            {petList.animals.map((pet) => (
              <PetCard
                key={pet.id}
                breeds={pet.breeds}
                id={pet.id}
                name={pet.name}
                photos={pet.photos}
                type={pet.type}
                primary_photo_cropped={pet.primary_photo_cropped}
              />
            ))}
          </Row>
        </Container>
      </div>
      <Button variant="primary" className="refresh" onClick={mutatePetlist}>
        Refresh
      </Button>
    </>
  );
};
