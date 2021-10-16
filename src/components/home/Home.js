import React, { useState, useEffect } from "react";
import { Button, Card, Row, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
// import Dog from "./dog.jpg";
import "./home.css";
import axios from "axios";
import LoadingSpinner from "../shared/Spinner";

import placeholder from "../pets/placeholder.jpg";

export default function Home({ token }) {
  const [petList, setpetList] = useState("");

  const renderCard = () => {
    return petList.map((pet) => {
      const link = pet.primary_photo_cropped;
      return (
        <Col md={4} xs={12} key={pet.id}>
          <Card>
            <Card.Img
              variant="top"
              alt={link ? pet.type : `${pet.type} placeholder`}
              src={link ? link.medium : placeholder}
            />
            <Card.Body className="cardBody">
              <Card.Title>{pet.name}</Card.Title>
              <Card.Text>
                <span className="breed">Breed: </span>
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

  const dog =
    "https://cdn.pixabay.com/photo/2016/11/23/18/06/dog-1854119_960_720.jpg";

  const allPets = ["Dog", "Cat", "Rabbit", "Horse", "Bird"];

  return (
    <div className="home__container">
      {/* <Image src={Dog} alt="doggo" roundedCircle id="dog" /> */}
      <div
        className="home_landing"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.2) ),url(${dog})`,
        }}
      >
        <div className="landing_text">
          <div>
            <h1>
              <span>Hi,</span> we are <br /> Pawternity Hub
            </h1>
            <Button as={Link} to="/pets" variant="primary">
              Adopt
            </Button>
          </div>
        </div>
        <img
          src="http://pawsitive.bold-themes.com/buddy/wp-content/uploads/sites/2/2019/08/white_bottom_wave_02.png"
          alt="bottom"
          width="100%"
          height="100px"
          className="wave_home_landing"
        />
      </div>
      <div className="pet_list_div">
        <ul className="pet_list">
          {allPets.map((el, index) => {
            return (
              <li
                className="pet_type"
                key={index}
                as={Link}
                to={`/pets/${el.toLowerCase()}`}
              >
                {el}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="featured__pets">
        <h2>Featured Pets</h2>
        <Container>
          <Row>{renderCards()}</Row>
        </Container>
      </div>
    </div>
  );
}
