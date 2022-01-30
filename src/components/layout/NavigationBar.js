import React, { Fragment, useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Image,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";
import Logo from "../../images/PawHubLogo.png";
import { useSignOut } from "react-supabase";
import { useAuth } from "../../context/SupaContext";
import { IoIosHeart } from "react-icons/io";

const petList = ["Dog", "Cat", "Rabbit", "Horse", "Bird"];
const PetTypes = () =>
  petList.map((type) => (
    <NavDropdown.Item key={type} as={Link} to={`/pets/${type.toLowerCase()}`}>
      {type}
    </NavDropdown.Item>
  ));

export default function NavigationBar() {
  const [{ fetching }, signOut] = useSignOut();
  const onClickSignOut = async () => {
    await signOut();
  };
  const { session, username } = useAuth();
  const [numFavorites, setNumFavorites] = useState(0);

  useEffect(() => {
    setInterval(() => {
      const numFavorites = JSON.parse(localStorage.getItem("favorites"))
        ? JSON.parse(localStorage.getItem("favorites")).length
        : 0;
      setNumFavorites(numFavorites);
    }, []);
  }, []);

  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image src={Logo} height={40} width={40} />
        </Navbar.Brand>
        <h1>Pawternity Hub</h1>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown title="Pets" id="navbarScrollingDropdown">
              <PetTypes />
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/pets">
                All Pets
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <NavDropdown title="Resources" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/resources">
                Resources
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tips">
                Tips
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/donate">
              Donate
            </Nav.Link>
            <Nav.Link as={Link} to="/stories">
              User Story
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              <IoIosHeart />
              <span style={{ fontSize: "14px" }}>{numFavorites}</span>
            </Nav.Link>
            <NavDropdown
              title={<i className="bi bi-person-circle"></i>}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item>Hello, {username}</NavDropdown.Item>
              <NavDropdown.Divider />
              {!session && (
                <Fragment>
                  <NavDropdown.Item as={Link} to="/register">
                    Register
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/login">
                    Login
                  </NavDropdown.Item>
                </Fragment>
              )}
              {session && (
                <>
                  <NavDropdown.Item as={Link} to="/reset-password">
                    Reset Password
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    disabled={fetching}
                    onClick={() => onClickSignOut()}
                  >
                    {fetching ? (
                      <Fragment>
                        <Spinner animation="grow" size="sm" />
                        Logging out
                      </Fragment>
                    ) : (
                      "Logout"
                    )}
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
