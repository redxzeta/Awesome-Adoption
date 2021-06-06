import "./donate.css";
import charity from "./charities.json";
import { Image } from "react-bootstrap";
import DonateCard from "./DonateCard";

const Donate = () => {
  return (
    <div className="donate">
      <h1 data-testid="donate-test-title">DONATE</h1>
      <section className="kofi__section">
        <p>
          Here are a list of places to donate to help pets and animals. Feel
          free to suggest any more charities. Could also message me if you
          donated and I&apos;ll add to a list of donors
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
          <DonateCard ch={ch} key={ch.name} />
        ))}
      </section>
    </div>
  );
};
export default Donate;
