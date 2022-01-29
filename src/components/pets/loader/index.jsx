import { Container, Row } from "react-bootstrap";

import LoadPlaceHolder from "../../shared/PlaceHolderCard";
import PetImg from "./PetErrorImg.jpg";
export const PetLoader = ({ type }) => {
  return (
    <Container className="pawhub">
      <div className="petList__container">
        <h1>Loading {type} Buddies</h1>
        <Row className="mb-3 w-100 petList">
          <LoadPlaceHolder />
          <LoadPlaceHolder />
          <LoadPlaceHolder />
        </Row>
      </div>
    </Container>
  );
};

export const PetErrorLoading = ({ type }) => (
  <Container className="pawhub">
    <div className="petList__container">
      <h1>Error Loading {type} Buddies</h1>
      <img src={PetImg} alt="petLoading" className="w-100" />
      <p>Please Try Again Later</p>
      Photo by
      <a href="https://unsplash.com/@anshaaleena?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
        Anusha Barwa
      </a>
      on
      <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
        Unsplash
      </a>
    </div>
  </Container>
);
