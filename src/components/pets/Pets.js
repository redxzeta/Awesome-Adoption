import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";

import "./pets.css";
import Bird from "./bird.jpg";
import Dog from "./doggo.jpg";
import Cat from "./cat.jpg";
import Horse from "./horse.jpg";
import Rabbit from "./rabbit.jpg";
import { Link, useRouteMatch } from "react-router-dom";
export default function Pets() {
  //   const [pets, setPets] = useState("");

  //   useEffect(() => {
  //     const config = {
  //       headers: { Authorization: `Bearer ${token}` },
  //     };
  //     axios
  //       .get("https://api.petfinder.com/v2/types", config)
  //       .then((response) => {
  //         setPets(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, [token]);

  let { url } = useRouteMatch();
  return (
    <div className="pet__container">
      <h1>Adopt Your Buddy</h1>
      <Row>
        <AnimalType img={Dog} type="dog" link={`${url}/dog`} />
        <AnimalType img={Cat} type="cat" link={`${url}/cat`} />
        <AnimalType img={Bird} type="bird" link={`${url}/bird`} />
        <AnimalType img={Horse} type="horse" link={`${url}/horse`} />
        <AnimalType img={Rabbit} type="rabbit" link={`${url}/rabbit`} />
      </Row>
    </div>
  );
}

const AnimalType = ({ type, img, link }) => (
  <Col xs={12} md={6} className="pet__column">
    <Image src={img} alt={type} roundedCircle />
    <Button as={Link} to={link} className="pet__button" color="primary">
      Click Here
    </Button>
  </Col>
);
