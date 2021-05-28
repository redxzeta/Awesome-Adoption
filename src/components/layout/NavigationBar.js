import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
// import axios from "axios";

const PetTypes = ({ types }) => {
  const listedPets = ["Dog", "Cat", "Bird", "Horse", "Rabbit"];
  return (
    <>
      {types
        .filter((type) => listedPets.indexOf(type.name) !== -1)
        .map((type, i) => (
          <NavDropdown.Item
            key={i}
            as={Link}
            to={`/pets/${type.name.toLowerCase()}`}
          >
            {type.name}
          </NavDropdown.Item>
        ))}
    </>
  );
};
const petList = {
  types: [
    {
      name: "Dog",
    },
    {
      name: "Cat",
    },
    {
      name: "Rabbit",
    },
    {
      name: "Horse",
    },
    {
      name: "Bird",
    },
  ],
};
export default function NavigationBar({ token }) {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // };
    const getTypes = () => {
      // axios
      //   .get("https://api.petfinder.com/v2/types", config)
      //   .then(({ data }) => data && setTypes(data.types))
      //   .catch((error) => {
      //     console.log(error);
      //   });
      setTypes(petList.types);
    };
    getTypes();
  }, [token]);

  return (
    <Navbar className = "Nav_bar" bg="primary" expand="lg">
      <Container>
      <Navbar.Brand href="/">PawHub</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <NavDropdown title="Pets" id="basic-nav-dropdown">
            <PetTypes types={types} />
            <NavDropdown.Item as={Link} to="/pets">
              All Pets
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/resources">
            Resources
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
