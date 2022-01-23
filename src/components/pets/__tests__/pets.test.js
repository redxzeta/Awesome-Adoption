import { cleanup, render, screen, waitFor } from "@testing-library/react";
import Pets, { AnimalType } from "../Pets";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import PetAuthProvider, { usePetAuth } from "../../../context/TokenContext";
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

test("Pets component should render with button", () => {
  render(
    <BrowserRouter>
      <Pets />
    </BrowserRouter>
  );
  const ClickHereButton = screen.getAllByRole("button", {
    name: /Click Here/i,
  });
  expect(ClickHereButton[0]).toHaveAttribute("href", "/dog");
  expect(ClickHereButton[1]).toHaveAttribute("href", "/cat");
  expect(ClickHereButton[2]).toHaveAttribute("href", "/bird");
  expect(ClickHereButton[3]).toHaveAttribute("href", "/horse");
  expect(ClickHereButton[4]).toHaveAttribute("href", "/rabbit");
});

test("should render list", () => {
  render(
    <BrowserRouter>
      <Pets />
    </BrowserRouter>
  );
  const petTypeList = screen.getAllByRole("link");
  expect(petTypeList.length).toBe(5);
  expect(petTypeList[0]).toHaveAttribute("href", "/dog");
  expect(petTypeList[1]).toHaveAttribute("href", "/cat");
  expect(petTypeList[2]).toHaveAttribute("href", "/bird");
  expect(petTypeList[3]).toHaveAttribute("href", "/horse");
  expect(petTypeList[4]).toHaveAttribute("href", "/rabbit");
});

test("should render with image", () => {
  render(
    <BrowserRouter>
      <Pets />
    </BrowserRouter>
  );
  const petImage = screen.getAllByRole("img");
  expect(petImage.length).toBe(5);
  expect(petImage[0]).toHaveAttribute("alt", "dog");
  expect(petImage[1]).toHaveAttribute("alt", "cat");
  expect(petImage[2]).toHaveAttribute("alt", "bird");
  expect(petImage[3]).toHaveAttribute("alt", "horse");
  expect(petImage[4]).toHaveAttribute("alt", "rabbit");
});

test("should render random pet", async () => {
  render(
    <BrowserRouter>
      <PetAuthProvider>
        <Pets />
      </PetAuthProvider>
    </BrowserRouter>
  );

  let petImage = screen.getAllByRole("img");
  expect(petImage.length).toBe(5);
  expect(screen.getByRole("status")).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.queryByRole("status")).not.toBeInTheDocument()
  );
  // expect(screen.queryByRole("status")).not.toBeInTheDocument();

  petImage = screen.getAllByRole("img");
  expect(petImage.length).toBe(6);
  expect(petImage[5]).toHaveAttribute("alt", "Baby Yoda");
});
