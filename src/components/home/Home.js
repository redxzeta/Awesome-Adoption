import React, { useState, useEffect } from "react";
import { Button, Image, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dog from "./dog.jpg";
import "./home.css";
import PetCard from "../layout/PetCard";
import LoadPlaceHolder from "../shared/PlaceHolderCard";
import { usePetAuth } from "../../context/TokenContext";

export default function Home() {
  const [petList, setpetList] = useState("");
  const { tokenHeaders } = usePetAuth();

  const renderCards = () => {
    return petList ? (
      petList.map((pet, index) => <PetCard key={index} pet={pet} />)
    ) : (
      <Row>
        <LoadPlaceHolder />
        <LoadPlaceHolder />
        <LoadPlaceHolder />
      </Row>
    );
  };

  useEffect(() => {
    const fetchRandomPets = () => {
      fetch(
        `https://api.petfinder.com/v2/animals?limit=3&sort=random
        `,
        tokenHeaders
      )
        .then((response) => response.json())
        .then((data) => {
          setpetList(data.animals);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    fetchRandomPets();
  }, []);

  return (
    <div className="home__container">
      <Image src={Dog} alt="doggo" roundedCircle className="shadow" id="dog" />
      <h2>Adopt a Buddy Today!</h2>
      <Button as={Link} to="/pets" variant="primary">
        Adopt
      </Button>
      <div className="featured__pets">
        <h2>Featured Pets</h2>
        <Container>
          <Row>{renderCards()}</Row>
        </Container>
      </div>
    </div>
  );
}
