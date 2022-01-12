import React, { useState, useEffect } from "react";
import LoadPlaceHolder from "../shared/PlaceHolderCard";
import "./pets.css";
import { Row, Container } from "react-bootstrap";
import PetCard from "../layout/PetCard";
import { usePetAuth } from "../../context/TokenContext";
import { lookUpPet } from "../../routes/API";

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

  return (
    <div className="petList__container">
      <h1>Your favorite Buddies!</h1>
      <Row className="mb-3 w-100 petList">
        {loading ? (
          <Row>
            <LoadPlaceHolder />
            <LoadPlaceHolder />
            <LoadPlaceHolder />
          </Row>
        ) : error ? (
          <Container>
            <h3>There was a problem getting the pet information :(</h3>
            <h4>Try again later!</h4>
          </Container>
        ) : petList && petList.length > 0 ? (
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
