import PetCardFlex, {
  PawHubContainer
} from "components/layout/Grid/PetCardFlex";
import React, { useState } from "react";

import OrganizationsCard from "./OrganizationsCard";
import charity from "./charities.json";

export type CharityType = {
  name: string;
  website: string;
  logo: string;
  location: string;
  founded: number;
  mission: string;
};

const Donate = () => {
  const [location, setLocation] = useState("All");
  const [charityFiltered, setCharityFiltered] =
    useState<CharityType[]>(charity);

  const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    <PawHubContainer>
      <h1 className="text-5xl font-bold font-amatic mb-10">ORGANIZATIONS</h1>
      <section>
        <p>Here are a list of organizations that help pets and animals.</p>

        <p>If you wish to help donate the site here, you can click here</p>
        <div className="flex flex-wrap justify-between items-center">
          <a href={process.env.REACT_APP_KOFI} target="_blank" rel="noreferrer">
            <img
              src="https://cdn.ko-fi.com/cdn/kofi2.png?v=2"
              className="h-auto w-48"
              alt="Buy Me a Coffee at ko-fi.com"
            />
          </a>
          <div className="mr-2">
            <label htmlFor="dropdown">Filter by place: </label>
            <select
              value={location}
              id="dropdown"
              data-testid="dropdown"
              onChange={handleDropdown}
            >
              <option value="All">All</option>
              {[
                ...new Set(charity.map((item) => item.location.toLowerCase()))
              ].map((cha, idx) => (
                <option value={cha.toLowerCase()} key={idx + cha}>
                  {cha}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <PetCardFlex>
        {charityFiltered.map((ch) => (
          <OrganizationsCard ch={ch} key={ch.name} />
        ))}
      </PetCardFlex>
    </PawHubContainer>
  );
};
export default Donate;
