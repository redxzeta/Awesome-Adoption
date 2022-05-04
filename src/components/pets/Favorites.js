import React from "react";
import { Container, Row } from "react-bootstrap";
import useSWR from "swr";

import { useAuth } from "../../context/SupaContext";
import { usePetAuth } from "../../context/TokenContext";
import { lookUpPet } from "../../routes/API";
import { multipleFetcher } from "../../utils/petInfoFetcher";
import PetCard from "../layout/PetCard";
import LoadPlaceHolder from "../shared/PlaceHolderCard";
import "./pets.css";

export default function Favorites() {
  const { favoritePets } = useAuth();
  const { tokenHeaders } = usePetAuth();

  const urlPets = favoritePets.map((f) => lookUpPet + f.pet);
  const { error, data: petList } = useSWR(
    tokenHeaders ? [urlPets, tokenHeaders] : null,
    multipleFetcher
  );

  const isLoading = !petList && !error;
  if (isLoading)
    return (
      <Container className="pawhub">
        <div className="petList__container">
          <Row className="mb-3 w-100 petList">
            <LoadPlaceHolder />
            <LoadPlaceHolder />
            <LoadPlaceHolder />
          </Row>{" "}
        </div>
      </Container>
    );

  if (error)
    return (
      <Container>
        <h3>There was a problem getting the pet information :(</h3>
        <h4>Try again later!</h4>
      </Container>
    );

  if (petList.length === 0)
    return (
      <Container>
        <h4>You have not marked a pet as a favorite yet :(</h4>
        <h5>Start selecting your favorites to find your future best friend!</h5>
      </Container>
    );

  return (
    <Container className="pawhub">
      <div className="petList__container">
        <h1>Your favorite Buddies!</h1>
        <Row className="mb-3 w-100 petList fadeInUp">
          {petList.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </Row>
      </div>
    </Container>
  );
}
