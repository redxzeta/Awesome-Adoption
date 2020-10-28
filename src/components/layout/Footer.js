import React from "react";
import { Container, Row } from "react-bootstrap";

import "./Footer.css";

const Footer = () => (
  <Container fluid as="footer" className="footer">
    <Row>
      <span>&copy; redxzeta 2020</span>
    </Row>
  </Container>
);

export default Footer;
