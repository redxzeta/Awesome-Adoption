import { PawHubContainer } from "components/layout/Grid/PetCardFlex";

import Contributors from "./Contributors";
import DiscordLogo from "./Discord.png";
import GithubIcon from "./GitHub.png";
import YoutubeLogo from "./Youtube2.png";
import DevPostLogo from "./devpost-modified.png";
import Dog from "./dog-cat.jpg";

export default function About() {
  return (
    <PawHubContainer>
      <div className="about__container content-center">
        <section className="paragraph--section">
          <img
            className=" mx-auto mb-3 rounded-2xl w-1/2   "
            src={Dog}
            alt="doggo"
          />
          <h1 className="font-amatic text-5xl font-bold ">
            About PawternityHub
          </h1>
          <p>
            It all began with an inspiring hackathon, Owl Hacks, where my group united with a shared goal – finding ways to support our community during the challenging times of Covid-19. Despite the event being held remotely, we saw this as a perfect opportunity to collaborate with developers from all around.
          </p>
          <p>
            Together, we conceptualized a brilliant idea – a Pet Adoption website. Our aim was to connect people with adorable, local pets available for adoption in their area. To bring this concept to life, we leveraged the power of React and enhanced the user experience with stylish elements using Bootstrap. To fetch the pet data, we integrated the PetFinder API.
          </p>
          <p>
            While working on the project, we encountered a few challenges, particularly in guiding some members who were new to React. As a team, we embraced this learning experience, supporting one another and growing together.
          </p>
          <p>
            Now, more than ever, we believe in the significance of companionship during these difficult times. Our website strives to make the process of adopting a pet much simpler, enabling people to find their perfect furry companion and provide them with love and care. By offering detailed information about each pet, we hope to assist potential adopters in making informed decisions.
          </p>
          <p>
            Our shared vision is to foster a sense of hope and positivity in the midst of the pandemic. We sincerely hope that this platform will not only connect people with their new animal companions but also inspire more kindness and empathy within our community. Together, let's make a difference and find solace in the companionship of our beloved pets during Covid-19.
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
            href="https://devpost.com/"
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

          <a
            target="blank"
            rel="noreferrer"
            href="https://discord.gg/rjbD2nq6S2"
            className="rounded"
          >
            <img
              className="w-12 mx-1 border-primary border-2 rounded-full"
              src={DiscordLogo}
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
