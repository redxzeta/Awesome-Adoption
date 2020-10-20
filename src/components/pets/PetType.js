import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import "./pets.css";
import {
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";

export default function PetType({ token }) {
  const [petList, setpetList] = useState("");
  const [code, setCode] = useState(19019);
  const [zipCode, setZipCode] = useState(19019);
  const [loading, setLoading] = useState(true);
  let { type } = useParams();
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(
        `https://api.petfinder.com/v2/animals?type=${type}&location=${zipCode}&limit=10&page=1`,
        config
      )
      .then((response) => {
        setpetList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, type, zipCode]);

  const search = () => {
    setZipCode(code);
    setLoading(true);
  };
  return (
    <div className="petList__container">
      <h1>List Of {type} Buddies</h1>
      <h2>ZipCode: {zipCode}</h2>

      <InputGroup size="md" className="mb-3" style={{ width: "40%" }}>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-sm">
            Enter Zip Code
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-label="Small"
          type="text"
          pattern="[0-9]{5}"
          aria-describedby="inputGroup-sizing-sm"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button onClick={search}>GO</Button>
      </InputGroup>
      <Row>
        {loading ? (
          <LoadingSpinner />
        ) : (
          petList &&
          petList.animals.map((pet) => {
            const img =
              pet.photos === undefined || pet.photos.length === 0
                ? "https://via.placeholder.com/300"
                : pet.photos[0].medium;
            // array empty or does not exist
            return (
              <Col md={4} xs={12} key={pet.id} className="petList__column">
                <Card style={{ width: "100%" }}>
                  <Card.Img variant="top" src={img} />
                  <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                    <Card.Text> Breed: {pet.breeds.primary}</Card.Text>
                    <Button
                      as={Link}
                      to={`/animal/${pet.id}`}
                      variant="primary"
                    >
                      More Info
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}

        {}
      </Row>
    </div>
  );
}
