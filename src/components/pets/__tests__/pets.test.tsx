import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import PetAuthProvider from "../../../context/TokenContext";
import { customRender } from "../../../swrconfigtest";
import { server } from "../../../testServer";
import Pets, { AnimalType } from "../Pets";
import { http, HttpResponse } from "msw";

test("matches animal link snapshot", () => {
  const animalLink = {
    img: "https://via.placeholder.com/150",
    type: "playtpus",
    link: "pets/playtpus"
  };
  const view = render(
    <BrowserRouter>
      <AnimalType type={animalLink.type} img={animalLink.img} link={animalLink.link} />
    </BrowserRouter>
  );
  expect(view).toMatchSnapshot();
});

describe("<Pets/>", () => {
  test("Pets component should render with button", () => {
    render(
      <BrowserRouter>
        <Pets />
      </BrowserRouter>
    );
    const ClickHereButton = screen.getAllByRole("link", {
      name: /Click Here/i
    });
    expect(ClickHereButton[0]).toHaveAttribute("href", "/dog");
    expect(ClickHereButton[1]).toHaveAttribute("href", "/cat");
    expect(ClickHereButton[2]).toHaveAttribute("href", "/bird");
    expect(ClickHereButton[3]).toHaveAttribute("href", "/horse");
    expect(ClickHereButton[4]).toHaveAttribute("href", "/rabbit");
  });

  test("Pet Component list should have attribute href ", () => {
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

  test("Pet Component should have img with alt attribute", () => {
    render(
      <BrowserRouter>
        <Pets />
      </BrowserRouter>
    );
    const petImage = screen.getAllByRole("img");
    expect(petImage.length).toBe(5);
    expect(petImage[0]).toHaveAttribute("alt", "Dog");
    expect(petImage[1]).toHaveAttribute("alt", "Cat");
    expect(petImage[2]).toHaveAttribute("alt", "Bird");
    expect(petImage[3]).toHaveAttribute("alt", "Horse");
    expect(petImage[4]).toHaveAttribute("alt", "Rabbit");
  });

  test("Pets Component should render random pet", async () => {
    customRender(
      <BrowserRouter>
        <PetAuthProvider>
          <Pets />
        </PetAuthProvider>
      </BrowserRouter>
    );

    let petImage = screen.getAllByRole("img");
    expect(petImage.length).toBe(5);
    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());

    petImage = screen.getAllByRole("img");
    expect(petImage.length).toBe(6);
    expect(petImage[5]).toHaveAttribute("alt", "Baby Yoda");
    expect(petImage[5]).toHaveAttribute("src", "babyYoda.medium.jpg");
  });

  test("Pets component should error random pet", async () => {
    server.use(
      http.get("https://api.petfinder.com/v2/animals", () => {
        return HttpResponse.json({ message: "Error" }, { status: 404 });
      })
    );

    customRender(
      <BrowserRouter>
        <PetAuthProvider>
          <Pets />
        </PetAuthProvider>
      </BrowserRouter>
    );

    let petImage = screen.getAllByRole("img");
    expect(petImage.length).toBe(5);
    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());

    petImage = screen.getAllByRole("img");
    expect(petImage.length).toBe(5);
    const errorTitle = screen.getByRole("heading", {
      name: /An Error Occurred/i,
      level: 1
    });

    expect(errorTitle).toBeInTheDocument();
  });

  test("Pets Component should render random pet with placeholder img", async () => {
    server.use(
      http.get("https://api.petfinder.com/v2/animals", () => {
        return HttpResponse.json(
          {
            animal: {
              id: 5,
              name: "Baby Yoda",
              photos: [
                {
                  medium: null
                }
              ]
            }
          },
          { status: 200 }
        );
      })
    );

    customRender(
      <BrowserRouter>
        <PetAuthProvider>
          <Pets />
        </PetAuthProvider>
      </BrowserRouter>
    );

    let petImage = screen.getAllByRole("img");
    expect(petImage.length).toBe(5);
    expect(screen.getByRole("status")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());

    petImage = screen.getAllByRole("img");
    expect(petImage.length).toBe(6);
    expect(petImage[5]).toHaveAttribute("alt", "Baby Yoda");
    expect(petImage[5]).toHaveAttribute("src", "/src/components/pets/placeholder-light.png");
  });
});
