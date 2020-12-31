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
    </Container>
  );
};

export default Footer;
