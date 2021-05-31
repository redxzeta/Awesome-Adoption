import "./donate.css";
import charity from "./charities.json";
import { Card, Image, Button } from "react-bootstrap";

const Donate = () => {
  return (
    <div className="donate">
      <h1>DONATE</h1>
      <section className="kofi__section">
        <p>
          Here are a list of places to donate to help pets and animals. Feel
          free to suggest any more charities. Could also message me if you
          donated and I'll add to a list of donors
        </p>
        <p>If you wish to help donate the site here, you can click here</p>
        <a href={process.env.REACT_APP_KOFI} target="_blank" rel="noreferrer">
          <Image
            src="https://cdn.ko-fi.com/cdn/kofi2.png?v=2"
            className="kofi__image"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </section>
      <section className="charity__section">
        {charity.map((ch) => (
          <Card key={ch.name}>
            <Card.Img variant="top" src={ch.logo} className="" />
            <Card.Body>
              <Card.Title>{ch.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Location: {ch.location}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                Founded: {ch.founded}
              </Card.Subtitle>
              <Card.Text>{ch.mission}</Card.Text>
              <Button variant="primary" href={ch.website} target="_blank">
                Click Here
              </Button>
            </Card.Body>
          </Card>
        ))}
      </section>
    </div>
  );
};
export default Donate;
