import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import Gallery from "../shared/Gallery";
import Spinner from "../shared/Spinner";
import Placeholder from "./placeholder.jpg";
import TokenContext from "../../context/TokenContext";
import nameCleaner from "../../utils/nameCleaner";

export default function PetInfo() {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const token = useContext(TokenContext);

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    fetch(`https://api.petfinder.com/v2/animals/${id}`, config)
      .then((response) => response.json())
      .then((data) => setPet(data.animal))
      .catch((error) => console.log(error));
  }, [id, token]);

  if (pet.name === undefined || pet.name === null) {
    return <Spinner />;
  } else {
    return (
      <div className="petInfo">
        <h1>{nameCleaner(pet.name)}</h1>
        {pet.photos === undefined || pet.photos.length === 0 ? (
          <img src={Placeholder} alt="placeholder" />
        ) : (
          <Gallery
            data={pet.photos.map((p) => ({ src: p.large, title: "" }))}
          />
        )}

        <Card>
          <Card.Header as="h5">{pet.type}</Card.Header>
          <Card.Body>
            <Card.Title>Breeds</Card.Title>
            <Card.Text>{pet.breeds.primary}</Card.Text>
            <Card.Title>Colors</Card.Title>
            <Card.Text>
              {pet.colors.primary ? pet.colors.primary : "N/A"}
            </Card.Text>
            <Card.Title>Age</Card.Title>
            <Card.Text>{pet.age}</Card.Text>
            <Card.Title>Gender</Card.Title>
            <Card.Text>{pet.gender}</Card.Text>
            <Card.Title>Contact</Card.Title>
            <Card.Text>Email: {pet.contact.email}</Card.Text>

            <a href={pet.url} target="_blank" without rel="noopener noreferrer">
              More Info
            </a>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
