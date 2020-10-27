import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Image, Button } from "react-bootstrap";
export default function PetInfo({ token }) {
  let { id } = useParams();
  const [pet, setPet] = useState("");
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`https://api.petfinder.com/v2/animals/${id}`, config)
      .then((response) => {
        setPet(response.data.animal);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, token]);

  const [ photoIndex, setPhotoIndex] = useState(0);
  let index = photoIndex;

  function nextPhoto(){
    if(pet.photos[index+1] !== undefined){
      setPhotoIndex(prevState => prevState + 1);
    }
  }

  function previousPhoto(){
    if(pet.photos[index-1] !== undefined){
      setPhotoIndex(prevState => prevState - 1);
    }
  }

  return (
    <div className="petInfo">
      <h1>{pet.name}</h1>
      {pet && <Image src={pet.photos[index].large} style={{}} />}
      <Button variant="primary" onClick={previousPhoto}>Previous Photo</Button>
      &nbsp;&nbsp;
      <Button variant="primary" onClick={nextPhoto}>Next</Button>

      <br />
      <br />
      {pet && (
        <Card>
          <Card.Header as="h5">{pet.type}</Card.Header>
          <Card.Body>
            <Card.Title>Breeds</Card.Title>
            <Card.Text>{pet.breeds.primary}</Card.Text>
            <Card.Title>Colors</Card.Title>
            <Card.Text>{pet.colors.primary}</Card.Text>
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
      )}
    </div>
  );
}
