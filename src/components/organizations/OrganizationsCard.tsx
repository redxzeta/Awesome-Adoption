import { Card } from "react-daisyui";

import { CharityType } from "./Organizations";

const DonateCard = ({ ch }: { ch: CharityType }) => (
  <article className="lg:px-4 px-1 w-full md:1/3 lg:w-1/4 my-4 fadeInUp h-full">
    <Card imageFull>
      <Card.Image src={ch.logo} alt={ch.name} className="w-full max-h-80 " />
      <Card.Body className="card-container">
        <Card.Title className="title-container" tag="h2">
          {" "}
          {ch.name}{" "}
        </Card.Title>
        <p>Location: {ch.location}</p>
        <p>Founded: {ch.founded}</p>
        <Card.Actions className="justify-end">
          <a
            href={ch.website}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Click Here
          </a>
        </Card.Actions>
      </Card.Body>
    </Card>
  </article>
);
export default DonateCard;
