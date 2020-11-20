import React from "react";
import { Image } from "react-bootstrap";
import Dog from "./dog.jpg";
import GitHubLogo from "./GitHub-Mark-Light-120px-plus.png";
import "./about.css";
export default function About() {
  const contributorAvatars = [
    "https://avatars1.githubusercontent.com/u/19883954?s=150&v=4",
     "https://avatars1.githubusercontent.com/u/17388273?s=150&v=4",
     "https://avatars3.githubusercontent.com/u/34899426?s=150&v=4",
     "https://avatars0.githubusercontent.com/u/1711057?s=150&v=4",
     "https://avatars2.githubusercontent.com/u/61450115?s=150&v=4",
     "https://avatars2.githubusercontent.com/u/54863160?s=150&v=4",
     "https://avatars2.githubusercontent.com/u/54453166?s=150&v=4",
     "https://avatars3.githubusercontent.com/u/13179054?s=150&v=4",
     "https://avatars3.githubusercontent.com/u/55332102?s=150&v=4",
     "https://avatars2.githubusercontent.com/u/41325679?s=150&v=4"
    ];

  return (
    <div className="about__container">
      <Image src={Dog} alt="doggo" roundedCircle />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <div className="contributors-section">
        <h1>Contributors</h1>
        <div className="contributors">
          {contributorAvatars.map(a => {
              return <img src={a} alt="Contributor Avatar"></img>
          })}

        </div>
        <a href="https://github.com/redxzeta/Awesome-Adoption"><img src={GitHubLogo} alt="GitHub logo"></img><p>GitHub</p></a>
      </div>
    </div>
  );
}
