import { Card } from "react-daisyui";
import useSWR from "swr";

import { usePetAuth } from "../../context/TokenContext";
import { fetcher } from "../../utils/petInfoFetcher";
import { AnimalTypeCard } from "./AnimalTypeCard";
import Placeholder from "./placeholder-light.png";

export const RandomPet = () => {
  const randomPetURL = "https://api.petfinder.com/v2/animals?limit=1&sort=random";
  const { tokenHeaders } = usePetAuth();

  const { error, data } = useSWR(tokenHeaders ? [randomPetURL, tokenHeaders] : null, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false
  });
  const isLoading = !error && !data;

  if (isLoading)
    return (
      <article className="lg:px-4 px-1 w-full md:1/3 lg:w-1/4 my-4 fadeInUp" role={"status"}>
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
  return <AnimalTypeCard type={data.name} img={randomPetImage} link={`/animal/${data.id}`} />;
};
