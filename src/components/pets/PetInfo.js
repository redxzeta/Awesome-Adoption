import React from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Gallery from "../shared/Gallery";
import Placeholder from "./placeholder.jpg";
import nameCleaner from "../../utils/nameCleaner";
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
import useFetch from "../../useHooks/useFetch";
import { lookUpPet } from "../../routes/API";
import LoaderComponent from "../../utils/LoaderComponent";

export default function PetInfo() {
  const { id } = useParams();

  const { tokenHeaders } = usePetAuth();

  const { data, isLoading, serverError } = useFetch(
    "GET",
    `${lookUpPet}${id}`,
    null,
    [id],
    tokenHeaders && tokenHeaders.headers
  );
  const pet = data == null ? {} : data.animal;

  function handleShare(e) {
    e.preventDefault();
    const shareData = {
      title: pet.type + " for adoption.",
      text: "Show some love to this animal. Please have a look if you want to adopt this cute life.",
      url: window.location.href,
    };
    if (navigator.share) {
      navigator
        .share(shareData)
        .then((result) => {
          console.log(result);
          console.log("Shared");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <LoaderComponent isLoading={isLoading} serverError={serverError}>
      <div className="petInfo">
        <h1>{nameCleaner(pet.name)}</h1>
        {pet.photos === undefined || pet.photos.length === 0 ? (
          <img src={Placeholder} alt="placeholder" />
        ) : (
          <Gallery
            data={pet.photos.map((p) => ({ src: p.large, title: "" }))}
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
            <Card.Text>{pet.breeds && pet.breeds.primary}</Card.Text>
          </div>
          <div className="color-info">
            <VscSymbolColor className="icon" />
            <Card.Title>Colors</Card.Title>
            <Card.Text>
              {pet.colors && pet.colors.primary ? pet.colors.primary : "N/A"}
            </Card.Text>
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
            <Card.Text>
              <a
                href={`mailto:${pet.contact && pet.contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pet.contact && pet.contact.email}
              </a>
            </Card.Text>
          </div>
        </div>

        <div className="actions">
          <a
            href={`mailto:${pet.contact && pet.contact.email}`}
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
    </LoaderComponent>
  );
}
