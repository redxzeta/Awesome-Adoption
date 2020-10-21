import React, { useEffect, useState } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

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
            to={`pets/${type.name.toLowerCase()}`}
          >
            {type.name}
          </NavDropdown.Item>
        ))}
    </>
  );
};

export default function NavigationBar({ token }) {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const getTypes = async () => {
      axios
        .get("https://api.petfinder.com/v2/types", config)
        .then(({ data }) => data && setTypes(data.types));
    };
    getTypes();
  }, [token]);

  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand href="#home">PawHub</Navbar.Brand>
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
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
