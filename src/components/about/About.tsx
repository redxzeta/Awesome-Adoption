import { PawHubContainer } from "components/layout/Grid/PetCardFlex";

import Contributors from "./Contributors";
import GithubIcon from "./GitHub.png";
import YoutubeLogo from "./Youtube2.png";
import DevPostLogo from "./devpost-modified.png";
import Dog from "./dog.jpg";

export default function About() {
  return (
    <PawHubContainer>
      <div className="about__container">
        <section className="paragraph--section">
          <img src={Dog} alt="doggo" />
          <h1 className="font-amatic text-5xl font-bold ">
            About PawternityHub
          </h1>
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
        <div className="flex justify-center items-center">
          <a
            target="blank"
            rel="noreferrer"
            href="https://youtu.be/vxAqS-GLna8"
            className="rounded"
          >
            <img
              className="w-12 mx-1 border-primary border-2 rounded-full"
              src={YoutubeLogo}
            />
          </a>

          <a
            target="blank"
            rel="noreferrer"
            href="https://github.com/redxzeta/Awesome-Adoption"
            className="rounded"
          >
            <img
              className="w-12 mx-1 border-primary border-2 rounded-full"
              src={DevPostLogo}
            />
          </a>

          <a
            target="blank"
            rel="noreferrer"
            href="https://github.com/redxzeta/Awesome-Adoption"
            className="rounded"
          >
            <img
              className="w-12 mx-1 border-primary border-2 rounded-full"
              src={GithubIcon}
            />
          </a>
        </div>
        <section className="contributors-section">
          <h2 className="font-amatic text-5xl font-bold ">Contributors</h2>

          <Contributors />
        </section>
      </div>
    </PawHubContainer>
  );
}
