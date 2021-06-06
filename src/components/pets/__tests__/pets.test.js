import { cleanup, render, screen } from "@testing-library/react";
import Pets, { AnimalType } from "../Pets";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
afterEach(() => {
  cleanup();
});

test("matches animal link snapshot", () => {
  const animalLink = {
    img: "https://via.placeholder.com/150",
    type: "playtpus",
    link: "pets/playtpus",
  };
  const tree = renderer
    .create(
      <BrowserRouter>
        <AnimalType
          type={animalLink.type}
          img={animalLink.img}
          link={animalLink.link}
        />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
