import React, { useState, useEffect, useContext } from "react";
import { Button, Image, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dog from "./dog.jpg";
import "./home.css";
import LoadingSpinner from "../shared/Spinner";
import PetCard from "../layout/PetCard";
import TokenContext from "../../context/TokenContext";

export default function Home() {
  const [petList, setpetList] = useState("");
  const token = useContext(TokenContext);

  const renderCards = () => {
    return petList ? (
      petList.map((pet, index) => <PetCard key={index} pet={pet} />)
    ) : (
      <LoadingSpinner />
    );
  };

  useEffect(() => {
    const fetchRandomPets = () => {
      const type = ["cat", "dog"];
      const randomType = type[Math.floor(Math.random() * type.length)];
      const config = { headers: { Authorization: `Bearer ${token}` } };
      fetch(
        `https://api.petfinder.com/v2/animals?type=${randomType}&location=19019&limit=3
        `,
        config
      )
        .then((response) => response.json())
        .then((data) => {
          setpetList(data.animals);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchRandomPets();
  }, [token]);

  return (
    <div className="home__container">
      <Image src={Dog} alt="doggo" roundedCircle id="dog" />
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
