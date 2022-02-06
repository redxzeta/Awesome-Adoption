import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import { usePetAuth } from "../../context/TokenContext";
import { lookUpPet } from "../../routes/API";
import PetCard from "../layout/PetCard";
import LoadPlaceHolder from "../shared/PlaceHolderCard";
import "./pets.css";

export default function Favorites() {
  const [error, setError] = useState();
  const [petList, setPetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );
  const { tokenHeaders } = usePetAuth();

  const getFavoritesData = () => {
    favorites.forEach(function (id) {
      const petFinderUrl = lookUpPet + id;
      fetch(petFinderUrl, tokenHeaders)
        .then((response) => response.json())
        .then((data) => {
          setPetList((petList) => [...petList, data.animal]);
        })
        .catch((error) => {
          setError(error);
        });
    });
  };

  useEffect(() => {
    favorites ? getFavoritesData() : setFavorites([]);
    setLoading(false);
  }, []);

  if (loading)
    return (
      <Row className="mb-3 w-100 petList">
        <LoadPlaceHolder />
        <LoadPlaceHolder />
        <LoadPlaceHolder />
      </Row>
    );

  if (error)
    return (
      <Container>
        <h3>There was a problem getting the pet information :(</h3>
        <h4>Try again later!</h4>
      </Container>
    );

  return (
    <div className="petList__container">
      <h1>Your favorite Buddies!</h1>
      <Row className="mb-3 w-100 petList">
        {petList && petList.length > 0 ? (
          petList.map((pet, index) => <PetCard key={index} pet={pet} />)
        ) : (
          <Container>
            <h4>You have not marked a pet as a favorite yet :(</h4>
            <h5>
              Start selecting your favorites to find your future best friend!
            </h5>
          </Container>
        )}
      </Row>
      <br />
    </div>
  );
}
