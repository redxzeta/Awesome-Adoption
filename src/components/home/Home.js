import React from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dog from "./dog.jpg";
import "./home.css";
import axios from "axios";
import LoadingSpinner from "../shared/Spinner";
import { useState, useEffect } from "react";
import { Card, Row, Container, Col } from "react-bootstrap";
import placeholder from "../pets/placeholder.jpg";

export default function Home({ token }) {
  const [petList, setpetList] = useState("");

  const renderCard = () => {
    return petList.map((pet) => {
      const link = pet.primary_photo_cropped;
      return (
        <Col md={4} xs={12} key={pet.id}>
          <Card style={{ margin: 10, paddingTop: 10, width: "100%" }}>
            <Card.Img
              variant="top"
              alt={link ? pet.type : `${pet.type} placeholder`}
              src={link ? link.medium : placeholder}
            />
            <Card.Body
              style={{
                flex: 1,
                alignSelf: "center",
              }}
            >
              <Card.Title style={{ textAlign: "center" }}>
                {pet.name}
              </Card.Title>
              <Card.Text>
                <span style={{ fontWeight: 500 }}>Breed: </span>
                {pet.breeds.primary}
              </Card.Text>
              <div className="button__style">
                <Button as={Link} to={`/animal/${pet.id}`}>
                  More Info
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  const renderCards = () => {
    return petList ? renderCard() : <LoadingSpinner />;
  };

  useEffect(() => {
    const fetchRandomPets = () => {
      const type = ["cat", "dog"];
      const randomType = type[Math.floor(Math.random() * type.length)];
      const config = { headers: { Authorization: `Bearer ${token}` } };
      axios
        .get(
          `https://api.petfinder.com/v2/animals?type=${randomType}&location=19019&limit=3
        `,
          config
        )
        .then((response) => {
          setpetList(response.data.animals);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchRandomPets();
  }, [token]);

  return (
    <div className="home__container">
      <h1>Pawternity Hub</h1>
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
