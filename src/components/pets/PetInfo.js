import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Spinner, Container } from "react-bootstrap";
import Gallery from "../shared/Gallery";
import Placeholder from "./placeholder.jpg";
import { nameCleaner } from "../../utils/utilsCleaner/index";
import { fetcher } from "../../utils/petInfoFetcher";
import {
  BsFillEnvelopeOpenFill,
  BsArrowRight,
  BsShareFill,
  BsGenderAmbiguous,
} from "react-icons/bs";
import { VscSymbolColor, VscTypeHierarchySub } from "react-icons/vsc";
import { GiAges } from "react-icons/gi";
import { HiMail } from "react-icons/hi";
import "./PetInfo.css";
import { usePetAuth } from "../../context/TokenContext";
import { lookUpPet } from "../../routes/API";
import useSWR from "swr";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

export default function PetInfo() {
  const { id } = useParams();
  const { tokenHeaders } = usePetAuth();
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );

  function handleShare(e) {
    e.preventDefault();
    const shareData = {
      title: pet.type + " for adoption.",
      text: "Show some love to this animal. Please have a look if you want to adopt this cute life.",
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData);
      // .then((result) => {
      //   console.log(result);
      //   console.log("Shared");
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    }
  }

  const { error, data: pet } = useSWR(
    tokenHeaders ? [lookUpPet + id, tokenHeaders] : null,
    fetcher
  );
  useEffect(() => {
    if (!favorites) setFavorites([]);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFav = (id) => {
    favorites.indexOf(id) > -1
      ? setFavorites((favorites) => favorites.filter((value) => value !== id))
      : setFavorites((favorites) => [...favorites, id]);
  };
  const isLoading = !pet && !error;


  if (isLoading) {
    return (
      <Container className="pawhub">
        <Spinner animation="grow" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  if (error) {
    return <h1>An Error Occurred</h1>;
  }

  return (
    <Container className="pawhub">
      <div className="petInfo">
        <div className="head__section">
          <h1>{nameCleaner(pet.name)}</h1>
          <h1>
            {favorites.includes(id) ? (
              <IoIosHeart onClick={() => addFav(id)} style={{ color: "red" }} />
            ) : (
              <IoIosHeartEmpty
                onClick={() => addFav(id)}
                style={{ color: "red" }}
              />
            )}
          </h1>
        </div>
        {pet.photos === undefined || pet.photos.length === 0 ? (
          <img src={Placeholder} alt="placeholder" />
        ) : (
          <Gallery
            data={pet.photos.map((p, index) => {
              return { src: p.large, title: `${pet.name}-large-${index}` };
            })}
          />
        )}
        <div className="info-body">
          <div className="primary-info">
            <Card.Title>Name - {pet.name}</Card.Title>
            <Card.Text className="description">{pet.description}</Card.Text>
          </div>
          <div className="breed-info">
            <VscTypeHierarchySub className="icon" />
            <Card.Title>Breeds</Card.Title>
            <Card.Text>{pet.breeds.primary}</Card.Text>
          </div>
          <div className="color-info">
            <VscSymbolColor className="icon" />
            <Card.Title>Colors</Card.Title>
            <Card.Text>{pet.colors.primary ?? "N/A"}</Card.Text>
          </div>
        </div>

        <div className="info-body">
          <div className="age-info">
            <GiAges className="icon" />
            <Card.Title>Age</Card.Title>
            <Card.Text>{pet.age}</Card.Text>
          </div>
          <div className="gender-info">
            <BsGenderAmbiguous className="icon" />
            <Card.Title>Gender</Card.Title>
            <Card.Text>{pet.gender}</Card.Text>
          </div>
          <div className="contact-info">
            <HiMail className="icon" />
            <Card.Title>Contact</Card.Title>
            <Card.Text className="contact">
              <a
                href={`mailto:${pet.contact && pet.contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pet.contact.email}
              </a>
            </Card.Text>
          </div>
        </div>

        <div className="actions">
          <a
            href={`mailto:${pet.contact.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="action-btn" variant="info" size="lg">
              Contact <BsFillEnvelopeOpenFill />
            </Button>
          </a>
          <Button
            onClick={handleShare}
            className="action-btn"
            variant="primary"
            size="lg"
            data-testid="btn-share"
          >
            Share <BsShareFill />
          </Button>
          <a href={pet.url} target="_blank" rel="noopener noreferrer">
            <Button className="action-btn" variant="success" size="lg">
              More Info <BsArrowRight />
            </Button>
          </a>
        </div>
      </div>
    </Container>
  );
}
