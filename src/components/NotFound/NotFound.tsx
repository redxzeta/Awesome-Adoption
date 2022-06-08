import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./NotFound.css";
import logo from "./NotFoundDog.svg";

export default function NotFound() {
  return (
    <Container className="pawhub py-2">
      <div className="innerNotFound">
        <div className="HoldAnimation">
          <Image src={logo} alt="page not found"></Image>
        </div>
        <div className="HoldText">
          <div className="HeaderText">
            <h1>Ruh Roh! 404 Error</h1>
            <h4>Page Not Found</h4>
          </div>
          <p>The pets you&apos;re looking for are in another castle!</p>

          <p>
            You either found a broken link or the content you were looking for
            was removed. Sorry!
          </p>

          <p>Heres a couple of pages you might have been looking for:</p>
          <ul className="pageList">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/pets">PETS</Link>
            </li>
            <li>
              <Link to="/resources">RESOURCES</Link>
            </li>
            <li>
              <Link to="/tips">TIPS</Link>
            </li>
            <li>
              <Link to="/donate">DONATE</Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
