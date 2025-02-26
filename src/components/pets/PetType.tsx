import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import PetCardFlex, {
  PawHubContainer,
} from "components/layout/Grid/PetCardFlex";
import { postcodeValidator } from "postcode-validator";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Form, Input, Pagination } from "react-daisyui";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { PetListType } from "types/PetType";

import { usePetAuth } from "../../context/TokenContext";
import { petFinderURL } from "../../routes/API";
import { fetcher } from "../../utils/petTypeFetcher";
import PetCard from "../layout/PetCard";
import LoadPlaceHolder from "../shared/PlaceHolderCard";
import { PetErrorLoading } from "./loader";

export default function PetType() {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const inputCode = useRef<HTMLInputElement | null>(null);
  const [goBtnDisabled, setGoBtnDisabled] = useState(false);
  const [validCodeError, setValidCodeError] = useState("");
  const [code, setCode] = useState<string | undefined>("19019");
  const [petLocation, setPetLocation] = useState<number | string>(19019);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { type } = useParams<{ type: PetListType }>();
  const { tokenHeaders } = usePetAuth();

  // Fetching the data through SWR
  const { data: petSearchList, error: fetcherror } = useSWR(
    tokenHeaders && type
      ? [petFinderURL(type, currentPage, petLocation), tokenHeaders]
      : null,
    fetcher
  );

  // If there is no data or error, show the loading placeholder
  const loading = !petSearchList && !fetcherror;

  // useEffect for managing the pagination
  useEffect(() => {
    setCurrentPage(currentPage);
    setTotalPages(petSearchList?.pagination?.total_pages || 1);
  }, [petSearchList, fetcherror, currentPage]);

  // useEffect for reseting pagination when location or type is changed
  useEffect(() => {
    setCurrentPage(1);
  }, [type, petLocation]);

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

  // ! To check validity of zipcode
  function checkValidation(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setValidCodeError("");
    setCode(inputCode?.current?.value);
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
    if (!code || !postcodeValidator(code, "US")) {
      setValidCodeError("Invalid zip Code");
    } else {
      setPetLocation(code);
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
        <Button
          variant="outline"
          color="primary"
          key="firstPage"
          onClick={() => changePage(1)}
        >
          <ChevronDoubleLeftIcon className="w-4" />
        </Button>
      );
    if (currentPage > 1)
      pageItems.push(
        <Button
          variant="outline"
          color="primary"
          key="prevPage"
          onClick={() => changePage(currentPage - 1)}
        >
          <ChevronLeftIcon className="w-4" />
        </Button>
      );
    // Prev

    for (let i = minShownPage; i <= maxShownPage; i++) {
      pageItems.push(
        <Button
          variant="outline"
          color="primary"
          key={i}
          active={i === currentPage}
          onClick={() => changePage(i)}
        >
          {i}
        </Button>
      );
    }
    if (currentPage < totalPages)
      pageItems.push(
        <Button
          color="primary"
          variant="outline"
          key="nextPage"
          onClick={() => changePage(currentPage + 1)}
        >
          <ChevronRightIcon className="w-4" />
        </Button>
      );
    if (currentPage !== totalPages)
      pageItems.push(
        <Button
          color="primary"
          variant="outline"
          key="lastPage"
          onClick={() => changePage(totalPages)}
        >
          <ChevronDoubleRightIcon className="w-4" />
        </Button>
      );

    return pageItems;
  };

  const changePage = (newPage: number) =>
    setCurrentPage((curr) => (curr !== newPage ? newPage : newPage));

  const errorAlert = (
    <Alert status="error" icon={<NoSymbolIcon className="w-6 h-6 mx-2" />}>
      Unable to retrieve your location, please enter your zip code.
      <Button onClick={() => setShowErrorAlert(false)}>Dismiss</Button>
    </Alert>
  );

  if (loading)
    return (
      <PawHubContainer>
        <h2 className="text-5xl font-bold font-amatic">Loading {type} Pets</h2>
        <PetCardFlex>
          <LoadPlaceHolder />
          <LoadPlaceHolder />
          <LoadPlaceHolder />
        </PetCardFlex>{" "}
      </PawHubContainer>
    );
  if (fetcherror || !petSearchList) return <PetErrorLoading type={type} />;
  return (
    <PawHubContainer>
      <h1 className="font-amatic text-5xl font-bold ">
        List Of {type} Buddies
      </h1>
      <div className="w-full flex justify-center items-center flex-col lg:p-4 my-2">
        <Form className="shadow-sm rounded-lg p-4 lg:w-1/4 w-full">
          <Form.Label title="Enter Zipcode: ">
            <Input
              ref={inputCode}
              aria-label="zipcode"
              type="text"
              pattern="[0-9]{5}"
              aria-describedby="zipcode-group"
              value={code}
              name="zipcode"
              onChange={checkValidation}
              className="lg:w-full w-1/2"
            />
          </Form.Label>
          <Button
            className="my-2"
            color="primary"
            disabled={goBtnDisabled}
            onClick={search}
          >
            Go
          </Button>
          <Button className="my-2" color="primary" onClick={findByLocation}>
            Use your location
          </Button>
        </Form>
      </div>
      {validCodeError && (
        <Alert
          status="warning"
          icon={<ExclamationTriangleIcon className="w-6 h-6 mx-2" />}
        >
          {validCodeError}
        </Alert>
      )}{" "}
      {showErrorAlert && errorAlert}
      <PetCardFlex>
        {petSearchList.animals.map((pet) => (
          <PetCard
            key={pet.id}
            breeds={pet.breeds}
            id={pet.id}
            name={pet.name}
            photos={pet.photos}
            type={pet.type}
            primary_photo_cropped={pet.primary_photo_cropped}
          />
        ))}
      </PetCardFlex>
      <Pagination className="flex flex-row justify-center my-4">
        {renderPagination()}
      </Pagination>
    </PawHubContainer>
  );
}
