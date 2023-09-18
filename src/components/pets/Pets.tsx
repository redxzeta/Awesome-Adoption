import PetCardFlex, {
  PawHubContainer
} from "components/layout/Grid/PetCardFlex";
import { Card } from "react-daisyui";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { PetListType } from "types/PetType";

import { usePetAuth } from "../../context/TokenContext";
import { fetcher } from "../../utils/petInfoFetcher";
import Bird from "./bird.jpg";
import Cat from "./cat.jpg";
import Dog from "./doggo.jpg";
import Horse from "./horse.jpg";
import Placeholder from "./placeholder-light.png";
import Rabbit from "./rabbit.jpg";

type PetLink = {
  type: PetListType;
  img: string;
};

const linkData: PetLink[] = [
  {
    img: Dog,
    type: "Dog"
  },
  {
    img: Cat,
    type: "Cat"
  },
  {
    img: Bird,
    type: "Bird"
  },
  {
    img: Horse,
    type: "Horse"
  },
  {
    img: Rabbit,
    type: "Rabbit"
  }
];

export default function Pets() {
  return (
    <PawHubContainer>
      <h1 className="text-5xl font-bold font-amatic mb-10">Adopt Your Buddy</h1>

      <PetCardFlex>
        {linkData.map((pet) => (
          <AnimalType
            img={pet.img}
            type={pet.type}
            link={`${pet.type.toLowerCase()}`}
            key={pet.type}
          />
        ))}
        <RandomPet />
      </PetCardFlex>
    </PawHubContainer>
  );
}

export const AnimalType = ({
  type,
  img,
  link
}: {
  type: string;
  img: string;
  link: string;
}) => {
  let linkDataTypes: string[] = [];
  linkData.forEach(({ type }) => {
    linkDataTypes = [...linkDataTypes, type];
  });
  const isLinkDataType = linkDataTypes.includes(type);

  return (
    <article className="lg:px-4 px-1 w-full md:1/3 lg:w-1/4 my-4 fadeInUp ">
      <Card imageFull>
        <Card.Image src={img} alt={type} className="w-full max-h-80 " />
        <Card.Body>
          <Card.Title tag="h2">
            {type} {isLinkDataType ? "Buddies" : "Buddy"}
          </Card.Title>
          <p>If a {type} chews shoes whose shoes does he choose?</p>
          <Card.Actions className="justify-end">
            <Link to={link} className="btn btn-primary">
              Click Here
            </Link>
          </Card.Actions>
        </Card.Body>
      </Card>
    </article>
  );
};

const RandomPet = () => {
  const randomPetURL =
    "https://api.petfinder.com/v2/animals?limit=1&sort=random";
  const { tokenHeaders } = usePetAuth();

  const { error, data } = useSWR(
    tokenHeaders ? [randomPetURL, tokenHeaders] : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false
    }
  );
  const isLoading = !error && !data;

  if (isLoading)
    return (
      <article
        className="lg:px-4 px-1 w-full md:1/3 lg:w-1/4 my-4 fadeInUp"
        role={"status"}
      >
        <Card imageFull>
          <div className="object-cover w-full animate-pulse  bg-primary" />
          <Card.Body>
            <Card.Title tag="h2">
              <span className="visually-hidden">Loading...</span>
            </Card.Title>

            <Card.Actions className="justify-end"></Card.Actions>
          </Card.Body>
        </Card>
      </article>
    );
  if (error || !data) {
    return <h1>An Error Occurred</h1>;
  }

  const randomPetImage = data.photos[0].medium ?? Placeholder;

  // assigns randomPetImage according to if a photo is available
  return (
    <AnimalType
      type={data.name}
      img={randomPetImage}
      link={`/animal/${data.id}`}
    />
  );
};
