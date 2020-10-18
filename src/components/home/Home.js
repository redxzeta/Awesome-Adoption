import React from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dog from "./dog.jpg";
import "./home.css";
export default function Home() {
  return (
    <div className="home__container">
      <h1>Pawternity Hub</h1>
      <Image src={Dog} alt="doggo" roundedCircle />
      <h2>Adopt a Buddy Today!</h2>
      <Button as={Link} to="/pets" variant="primary">
        Adopt
      </Button>
    </div>
  );
}
