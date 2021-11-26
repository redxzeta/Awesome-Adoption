import "./donate.css";
import charity from "./charities.json";
import { Image, Button } from "react-bootstrap";
import DonateCard from "./DonateCard";
import DonateModal from "./DonateModal";
import { useState } from "react";

const Donate = () => {
  const [location, setLocation] = useState("All");
  const [charityFiltered, setCharityFiltered] = useState(charity);

  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDropdown = (e) => {
    setLocation(e.target.value);
    if (e.target.value === "All") {
      setCharityFiltered(charity);
      return;
    }

    const temp = charity.filter(
      (charity) =>
        charity.location.toLowerCase() === e.target.value.toLowerCase()
    );
    setCharityFiltered(temp);
  };

  return (
    <div className="donate">
      <h1 data-testid="donate-test-title">DONATE</h1>
      <section className="kofi__section">
        <p>
          Here are a list of places to donate to help pets and animals. Feel
          free to suggest any more charities. You could also add new
          organizations you donated below
        </p>
        <p>
          <Button variant="primary" onClick={handleShow}>
            Submit an Organization
          </Button>
        </p>
        <DonateModal show={showModal} handleClose={handleClose} />
        <p>If you wish to help donate the site here, you can click here</p>
        <div className="kofi__section__donate">
          <a href={process.env.REACT_APP_KOFI} target="_blank" rel="noreferrer">
            <Image
              src="https://cdn.ko-fi.com/cdn/kofi2.png?v=2"
              className="kofi__image"
              alt="Buy Me a Coffee at ko-fi.com"
            />
          </a>
          <div className="filtering">
            <label htmlFor="dropdown">Filter by place: </label>
            <select
              value={location}
              id="dropdown"
              data-testid="dropdown"
              onChange={handleDropdown}
            >
              <option value="All">All</option>
              {[
                ...new Set(charity.map((item) => item.location.toLowerCase())),
              ].map((cha, idx) => (
                <option
                  value={cha.toLowerCase()}
                  data-testid={`donate-test-selection-${cha.replace(" ", "-")}`}
                  key={idx + cha}
                >
                  {cha}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <section className="charity__section">
        {charityFiltered.map((ch) => (
          <DonateCard ch={ch} key={ch.name} />
        ))}
      </section>
    </div>
  );
};
export default Donate;
