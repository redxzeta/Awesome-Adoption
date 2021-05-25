import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../shared/Spinner";
import axios from "axios";
import "./pets.css";
import {
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  Row,
  Pagination,
} from "react-bootstrap";
import { postcodeValidator } from "postcode-validator";
import Placeholder from "./placeholder.jpg";

export default function PetType({ token }) {
  const inputCode = useRef(null);
  const [petList, setpetList] = useState("");
  const [code, setCode] = useState(19019);
  const [zipCode, setZipCode] = useState(19019);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let { type } = useParams();
  const findPets = useCallback(
    (page) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(
          `https://api.petfinder.com/v2/animals?type=${type}&location=${zipCode}&limit=12&page=${
            page || 1
          }`,
          config
        )
        .then((response) => {
          setTotalPages(
            response.data && response.data.pagination
              ? response.data.pagination.total_pages || 1
              : 1
          );
          setpetList(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [token, type, zipCode]
  );

  useEffect(() => {
    setCurrentPage(1);
    setLoading(true);
    findPets(1);
  }, [token, type, zipCode, findPets]);

  const search = () => {
    if (postcodeValidator(code, "US")) {
      setZipCode(code);
      setLoading(true);
    } else {
      inputCode.current.value = "Invalid ZipCode";
    }
  };

  const onHoverPhoto = (event) => {
    const petId = parseInt(event.target.id);
    const pet = petList.animals.find((pet) => {
      return pet.id === petId;
    });
    if (pet && pet.photos && pet.photos.length > 1) {
      const randomPhotoIndex = Math.floor(
        Math.random() * (pet.photos.length - 1) + 1
      );
      event.target.src = pet.photos[randomPhotoIndex].medium;
    }
  };

  const onBlurPhoto = (event) => {
    const petId = parseInt(event.target.id);
    const pet = petList.animals.find((pet) => {
      return pet.id === petId;
    });

    if (pet && pet.photos && pet.photos.length > 1) {
      event.target.src = pet.photos[0].medium;
    }
  };

  const renderPagination = () => {
    let pageItems = [];
    let minShownPage = 1;
    let maxShownPage = 1;
    if (totalPages - currentPage < 2) {
      minShownPage = totalPages - 4;
      maxShownPage = totalPages;
    } else {
      minShownPage = currentPage - 2;
      maxShownPage = currentPage + 2;
    }

    if (currentPage - 1 < 2) {
      minShownPage = 1;
      maxShownPage = totalPages > 5 ? 5 : totalPages;
    }

    if (minShownPage < 1) minShownPage = 1;
    if (currentPage > 1)
      pageItems.push(
        <Pagination.First key="firstPage" onClick={() => changePage(1)} />
      );
    if (currentPage > 1)
      pageItems.push(
        <Pagination.Prev
          key="prevPage"
          onClick={() => changePage(currentPage - 1)}
        />
      );

    for (let i = minShownPage; i <= maxShownPage; i++) {
      pageItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => changePage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    if (currentPage < totalPages)
      pageItems.push(
        <Pagination.Next
          key="nextPage"
          onClick={() => changePage(currentPage + 1)}
        />
      );
    if (currentPage !== totalPages)
      pageItems.push(
        <Pagination.Last
          key="lastPage"
          onClick={() => changePage(totalPages)}
        />
      );

    return pageItems;
  };

  const changePage = (newPage) => {
    if (newPage !== currentPage) {
      setLoading(true);
      setCurrentPage(newPage);
      findPets(newPage);
    }
  };

  const nameCleaner = (str) => {
    if (str !== undefined) {
      return str.replace(/(^\w+:|^)\/\//, '')
      .replaceAll('&#039;','\'')
      .replaceAll('&#39;','\'')
      .replaceAll('&quot;','"')
      .replaceAll('&rsquo;','\'')
      .replaceAll('&amp;','&')
      .replaceAll('&ldquo;','"')
      .replaceAll('&hellip;','...')
  }
  };

  return (
    <div className="petList__container">
      <h1>List Of {type} Buddies</h1>
      <h2>ZipCode: {zipCode}</h2>

      <div className="inputContainer">
        <InputGroup size="md" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">
              Enter Zip Code
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            ref={inputCode}
            aria-label="Small"
            type="text"
            pattern="[0-9]{5}"
            aria-describedby="inputGroup-sizing-sm"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ width: 100 }}
          />
          <Button onClick={search}>GO</Button>
        </InputGroup>
      </div>
      <Row>
        {loading ? (
          <LoadingSpinner />
        ) : (
          petList &&
          petList.animals.map((pet) => {
            const img =
              pet.photos === undefined || pet.photos.length === 0
                ? "placeholder"
                : pet.photos[0].medium;
            // array empty or does not exist
            return (
              <Col md={4} xs={12} key={pet.id} className="petList__column">
                <Card style={{ width: "100%", paddingTop: 10 }}>
                  {img === "placeholder" ? (
                    <Card.Img
                      id={pet.id}
                      variant="top"
                      alt={`${type} placeholder`}
                      src={Placeholder}
                      onMouseEnter={onHoverPhoto}
                      onMouseLeave={onBlurPhoto}
                    />
                  ) : (
                    <Card.Img
                      id={pet.id}
                      variant="top"
                      alt={type}
                      src={img}
                      onMouseEnter={onHoverPhoto}
                      onMouseLeave={onBlurPhoto}
                    />
                  )}
                  <Card.Body>
                    <Card.Title style={{whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>{nameCleaner(pet.name)}</Card.Title>
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
      </Row>
      {!loading && (
        <Row>
          <Col md={12} xs={12}>
            <Pagination>{renderPagination()}</Pagination>
          </Col>
        </Row>
      )}
      <br />
    </div>
  );
}
