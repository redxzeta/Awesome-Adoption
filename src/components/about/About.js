import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";
import Dog from "./dog.jpg";
import GitHubLogo from "./GitHub-Mark-Light-120px-plus.png";
import "./about.css";
import YoutubeLogo from "./youtube.png";
import DevPostLogo from "./devpost.png";

const apiUrl =
  "https://api.github.com/repos/redxzeta/Awesome-Adoption/contributors";
export default function About() {
  const [avatars, setAvatars] = useState([]); // by default there are no avatars

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(apiUrl);
      setAvatars(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="about__container">
      <section className="paragraph--section">
        <Image src={Dog} alt="doggo" roundedCircle />
        <h1>About PawternityHub</h1>
        <p>
          It all started in a hackathon as my group brainstormed for ideas on
          what we can do to help the community. Due to covid19, the hackathon,
          Owl Hacks, was done remotely and seemed the perfect opportunity to
          meet and collaborate with other developers. My group came up with the
          idea of creating a Pet Adoption website where people could find local
          pets around their area to adopt. The technology we used is React along
          with Bootstrap for the styling and using the PetFinder API to request
          information about the pets. It was tricky because some of the members
          were brand new to React and had to show them the ropes. It was quite
          the learning experience for them and me too as I never really taught
          React
        </p>
        <p>
          Due to the harsh times we are in, I hope people would be able to find
          their own buddy that can help them. The goal is to make it easier for
          people to adopt pets and learn more information about the pets during
          covid19 - redxzeta
        </p>
      </section>
      <div className="social-links-container">
        <a
          target="blank"
          rel="noreferrer"
          href="https://youtu.be/vxAqS-GLna8"
          className="social-links"
        >
          <Image src={YoutubeLogo} />
        </a>
        <a
          target="blank"
          rel="noreferrer"
          href="https://devpost.com/software/pawternity-hub"
          className="social-links"
        >
          <Image src={DevPostLogo} />
        </a>
      </div>
      <div className="contributors-section">
        <h1>Contributors</h1>
        <div className="contributors" id="contributors">
          {avatars.map((a) => (
            <a
              className="contributor-link"
              key={a.id}
              href={a.html_url}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="contributor-avatar"
                key={a.id}
                src={a.avatar_url}
                alt="Contributor Avatar"
              />
            </a>
          ))}
        </div>
        <a
          className="social-button"
          href="https://github.com/redxzeta/Awesome-Adoption"
          target="_blank"
          rel="noreferrer"
        >
          <img src={GitHubLogo} alt="GitHub logo" />
          <p>GitHub</p>
        </a>
      </div>
    </div>
  );
}
