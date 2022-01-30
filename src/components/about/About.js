import React from "react";
import { Container, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import Dog from "./dog.jpg";
import "./about.css";
import YoutubeLogo from "./Youtube2.png";
import DevPostLogo from "./devpost-modified.png";
import GithubIcon from "./GitHub.png";
import Contributors from "./Contributors";

export default function About() {
  return (
    <Container className="pawhub py-4">
      <div className="about__container">
        <section className="paragraph--section">
          <Image src={Dog} alt="doggo" roundedCircle />
          <h1>About PawternityHub</h1>
          <p>
            It all started in a hackathon as my group brainstormed for ideas on
            what we can do to help the community. Due to covid19, the hackathon,
            Owl Hacks, was done remotely and seemed the perfect opportunity to
            meet and collaborate with other developers. My group came up with
            the idea of creating a Pet Adoption website where people could find
            local pets around their area to adopt. The technology we used is
            React along with Bootstrap for the styling and using the PetFinder
            API to request information about the pets. It was tricky because
            some of the members were brand new to React and had to show them the
            ropes. It was quite the learning experience for them and me too as I
            never really taught React
          </p>
          <p>
            Due to the harsh times we are in, I hope people would be able to
            find their own buddy that can help them. The goal is to make it
            easier for people to adopt pets and learn more information about the
            pets during covid19 - redxzeta
          </p>
        </section>
        <h1>Links</h1>
        <div className="social-links-container">
          <OverlayTrigger
            key="youtube-icon"
            overlay={<Tooltip id="tooltip-disabled">Youtube</Tooltip>}
          >
            <a
              target="blank"
              rel="noreferrer"
              href="https://youtu.be/vxAqS-GLna8"
              className="social-links"
            >
              <Image className="contributor-avatar" src={YoutubeLogo} />
            </a>
          </OverlayTrigger>
          <OverlayTrigger
            key="DevPost-icon"
            overlay={<Tooltip id="tooltip-disabled">DevPost</Tooltip>}
          >
            <a
              target="blank"
              rel="noreferrer"
              href="https://github.com/redxzeta/Awesome-Adoption"
              className="social-links"
            >
              <Image className="contributor-avatar" src={DevPostLogo} />
            </a>
          </OverlayTrigger>
          <OverlayTrigger
            key="Github-icon"
            overlay={<Tooltip id="tooltip-disabled">Github</Tooltip>}
          >
            <a
              target="blank"
              rel="noreferrer"
              href="https://github.com/redxzeta/Awesome-Adoption"
              className="social-links"
            >
              <Image className="contributor-avatar" src={GithubIcon} />
            </a>
          </OverlayTrigger>
        </div>
        <div className="contributors-section">
          <h1>Contributors</h1>
          <div className="contributors" id="contributors">
            <Contributors />
          </div>
        </div>
      </div>
    </Container>
  );
}
