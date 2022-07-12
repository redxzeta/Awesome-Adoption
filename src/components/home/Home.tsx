import PetCardGrid from "components/layout/Grid/PetCardGrid";
import { Button, Card, Hero } from "react-daisyui";
import useSWR from "swr";
import { PetCardType } from "types/PetType";
import { PetSearchType } from "utils/petTypeFetcher";

import { usePetAuth } from "../../context/TokenContext";
import { randomPetsList } from "../../routes/API";
import { fetcher } from "../../utils/homePageFetcher";
// import PetCard from "../layout/PetCard";
import PlaceHolder from "../pets/placeholder.jpg";
import LoadPlaceHolder from "../shared/PlaceHolderCard";
import "./home.css";

export default function Home() {
  return (
    <div>
      <Hero className="home__background min-h-screen">
        <Hero.Overlay className="bg-opacity-60" />
        <Hero.Content className="text-center">
          <div className="max-w-md text-base-100">
            <h1 className="text-5xl font-bold font-amatic">Get a BFF</h1>
            <h2 className="text-5xl font-bold font-amatic">Now and Forever </h2>

            <Button color="primary" className="my-2">
              Get Started
            </Button>
          </div>
        </Hero.Content>
      </Hero>
      {/* <LinkContainer to="/pets">
          <Button variant="primary">Adopt</Button>
        </LinkContainer>
        <LoadingPetCards /> */}
      <LoadingPetCards />
    </div>
  );
}

const LoadingPetCards = () => {
  const { tokenHeaders } = usePetAuth();
  const {
    error,
    data: petList,
    mutate,
  } = useSWR(tokenHeaders ? [randomPetsList, tokenHeaders] : null, fetcher, {
    revalidateOnFocus: false,
  });
  const mutatePetlist = async () => mutate({} as PetSearchType);

  if (error)
    return (
      <>
        <h5>Oops! An Error Occurred Getting The Pets</h5>{" "}
        <Button color="primary" className="refresh" onClick={mutatePetlist}>
          Refresh
        </Button>
      </>
    );

  if (!petList)
    return (
      <>
        <LoadPlaceHolder />
        <LoadPlaceHolder />
        <LoadPlaceHolder />
      </>
    );

  return (
    <div className="container-md mx-auto">
      <div>
        <h2>Featured Pets</h2>

        <PetCardGrid>
          {petList.animals.map((pet) => (
            // <PetCard
            //   key={pet.id}
            //   breeds={pet.breeds}
            //   id={pet.id}
            //   name={pet.name}
            //   photos={pet.photos}
            //   type={pet.type}
            //   primary_photo_cropped={pet.primary_photo_cropped}
            // />

            <DaisyCard
              key={pet.id}
              id={pet.id}
              name={pet.name}
              photos={pet.photos}
              type={pet.type}
              breeds={pet.breeds}
              primary_photo_cropped={pet.primary_photo_cropped}
            />
          ))}
        </PetCardGrid>
      </div>
      {/* <Button color="primary" className="refresh" onClick={mutatePetlist}>
        Refresh
      </Button> */}
    </div>
  );
};

const DaisyCard = (props: PetCardType) => {
  return (
    <Card className="w-96 bg-base-100 shadow-xl" bordered>
      <Card.Image
        src={props.primary_photo_cropped?.medium || PlaceHolder}
        className="object-cover h-72 w-full"
      />
      <Card.Body>{props.name}</Card.Body>
    </Card>
  );
};
