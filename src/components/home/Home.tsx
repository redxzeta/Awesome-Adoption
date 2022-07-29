import PetCardFlex from "components/layout/Grid/PetCardFlex";
import PetCard from "components/layout/PetCard";
import { Button, Hero } from "react-daisyui";
import useSWR from "swr";
import { PetSearchType } from "utils/petTypeFetcher";

import { usePetAuth } from "../../context/TokenContext";
import { randomPetsList } from "../../routes/API";
import { fetcher } from "../../utils/homePageFetcher";
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
  const isLoading = !error && !petList?.animals;

  if (isLoading)
    return (
      <div className="container mx-auto px-4 md:px-12 pt-6">
        <h2 className="text-5xl font-bold font-amatic">Loading Pets</h2>
        <PetCardFlex>
          <LoadPlaceHolder />
          <LoadPlaceHolder />
          <LoadPlaceHolder />
        </PetCardFlex>{" "}
      </div>
    );
  if (error || !petList)
    return (
      <>
        <h5>Oops! An Error Occurred Getting The Pets</h5>{" "}
        <Button color="primary" className="refresh" onClick={mutatePetlist}>
          Refresh
        </Button>
      </>
    );

  return (
    <div className="container mx-auto px-4 md:px-12 pt-6">
      <h2 className="text-5xl font-bold font-amatic">Featured Pets</h2>

      <PetCardFlex>
        {petList.animals.map((pet) => (
          <PetCard
            key={pet.id}
            id={pet.id}
            name={pet.name}
            photos={pet.photos}
            type={pet.type}
            breeds={pet.breeds}
            primary_photo_cropped={pet.primary_photo_cropped}
          />
        ))}
      </PetCardFlex>

      <Button color="primary" onClick={mutatePetlist}>
        Refresh
      </Button>
    </div>
  );
};
