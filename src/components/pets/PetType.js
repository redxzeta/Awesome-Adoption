import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import LoadPlaceHolder from "../shared/PlaceHolderCard";
import "./pets.css";
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  Row,
  Pagination,
  Alert,
} from "react-bootstrap";
import { postcodeValidator } from "postcode-validator";
import PetCard from "../layout/PetCard";
import { usePetAuth } from "../../context/TokenContext";

export default function PetType() {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const inputCode = useRef(null);
  const [petList, setpetList] = useState("");
  const [goBtnDisabled, setGoBtnDisabled] = useState(false);
  const [validCodeError, setValidCodeError] = useState("");
  const [code, setCode] = useState(19019);
  const [petLocation, setPetLocation] = useState(19019);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { type } = useParams();
  const { tokenHeaders } = usePetAuth();

  const findByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude.toString();
          const longitude = position.coords.longitude.toString();
          if (latitude && longitude) {
            setPetLocation(`${latitude},${longitude}`);
            setShowErrorAlert(false);
          } else {
            setShowErrorAlert(true);
          }
        },
        () => {
          setShowErrorAlert(true);
        }
      );
    }
  };

  const findPets = useCallback(
    (page, location) => {
      const petFinderUrl = `https://api.petfinder.com/v2/animals?type=${type}&location=${location}&limit=12&page=${
        page || 1
      }`;

      fetch(petFinderUrl, tokenHeaders)
        .then((response) => response.json())
        .then((data) => {
          setTotalPages(
            data && data.pagination ? data.pagination.total_pages || 1 : 1
          );
          setpetList(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    },
    [type, petLocation]
  );

  useEffect(() => {
    setCurrentPage(1);
    setLoading(true);
    findPets(1, petLocation);
  }, [type, petLocation, findPets]);

  // ! To check validity of zipcode
  function checkValidation(e) {
    setValidCodeError("");
    setCode(inputCode.current.value);
    const codeLength = e.target.value.length;
    if (codeLength < 5 || codeLength > 5) {
      setGoBtnDisabled(true);
    } else {
      if (postcodeValidator(e.target.value, "US")) {
        setGoBtnDisabled(false);
      } else {
        setValidCodeError("Invalid zip Code");
        setGoBtnDisabled(true);
      }
    }
  }

  const search = () => {
    if (postcodeValidator(code, "US")) {
      setPetLocation(code);
      setLoading(true);
    } else {
      inputCode.current.value = "Invalid ZipCode";
    }
  };

  const renderPagination = () => {
    const pageItems = [];
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
      findPets(newPage, petLocation);
    }
  };

  const errorAlert = (
    <Alert onClose={() => setShowErrorAlert(false)} dismissible>
      Unable to retrieve your location, please enter your zip code.
    </Alert>
  );
  return (
    <div className="petList__container">
      <h1>List Of {type} Buddies</h1>

      <div className="inputContainer">
        <InputGroup size="md" className="mb-3">
          <InputGroup.Text as="label" id="zipcode-group">
            Enter ZipCode:
          </InputGroup.Text>
          <FormControl
            ref={inputCode}
            aria-label="zipcode"
            type="text"
            pattern="[0-9]{5}"
            aria-describedby="zipcode-group"
            value={code}
            name="zipcode"
            onChange={(e) => checkValidation(e)}
          />
          <Button disabled={goBtnDisabled} onClick={search}>
            Go
          </Button>
        </InputGroup>
        {showErrorAlert && errorAlert}
        <Button className="mb-3" onClick={findByLocation}>
          Use your location
        </Button>

        {validCodeError && <Alert variant="danger">{validCodeError}</Alert>}
      </div>
      <Row className="mb-3 w-100 petList">
        {loading ? (
          <Row>
            <LoadPlaceHolder />
            <LoadPlaceHolder />
            <LoadPlaceHolder />
          </Row>
        ) : (
          petList &&
          petList.animals.map((pet, index) => <PetCard key={index} pet={pet} />)
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
