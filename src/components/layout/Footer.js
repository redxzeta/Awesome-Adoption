import React from "react";
import { Container, Row } from "react-bootstrap";

import "./Footer.css";

const Footer = () => {
  const year = new Date();
  return (
    <Container fluid as="footer" className="footer">
      <Row>
        <span>&copy; redxzeta 2020 - {year.getFullYear()}</span>
      </Row>
      <Row>
        <span>
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </span>
      </Row>
    </Container>
  );
};

export default Footer;
