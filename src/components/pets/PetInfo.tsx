import { ArrowRightIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import { ShareIcon } from "@heroicons/react/24/outline";
import PetCardFlex, {
  PawHubContainer,
} from "components/layout/Grid/PetCardFlex";
import Spinner from "components/shared/spinner/Spinner";
import { Button, Card, Carousel } from "react-daisyui";
import { BsGenderAmbiguous } from "react-icons/bs";
import { GiAges } from "react-icons/gi";
import { HiMail } from "react-icons/hi";
import { VscSymbolColor, VscTypeHierarchySub } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import { usePetAuth } from "../../context/TokenContext";
import { lookUpPet } from "../../routes/API";
import { fetcher } from "../../utils/petInfoFetcher";
import { nameCleaner } from "../../utils/utilsCleaner/index";
import FavoriteSection from "./Favorites/FavoriteSection";
import Placeholder from "./placeholder-light.jpg";

export default function PetInfo() {
  const { id } = useParams<string>();
  const { tokenHeaders } = usePetAuth();

  function handleShare() {
    const shareData = {
      title: pet?.type + " for adoption.",
      text: "Show some love to this animal. Please have a look if you want to adopt this cute life.",
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData);
      // .then((result) => {
      //   console.log("Shared");
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    }
  }

  const { error, data: pet } = useSWR(
    tokenHeaders ? [lookUpPet + id, tokenHeaders] : null,
    fetcher
  );

  if (error || !id) {
    return <h1>An Error Occurred</h1>;
  }
  if (!pet) {
    return (
      <PawHubContainer>
        <Spinner />
      </PawHubContainer>
    );
  }

  return (
    <PawHubContainer>
      <div className="flex flex-row justify-between">
        <h1 className="text-5xl font-bold font-amatic">
          {nameCleaner(pet.name)}
        </h1>

        <FavoriteSection id={id} />
      </div>{" "}
      <div className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-box my-4">
        {!pet.photos ? (
          <img src={Placeholder} alt="placeholder" />
        ) : (
          <div className="w-1/2 mx-auto py-8">
            <Carousel
              display="numbered"
              className="rounded-box"
              color="primary"
            >
              {pet.photos.map((p, index) => {
                const largePhoto = p.large ? p.large : Placeholder;
                return (
                  <Carousel.Item
                    key={index}
                    src={largePhoto}
                    alt={`${pet.name}-large-${index}`}
                  />
                );
              })}
            </Carousel>
          </div>
        )}
      </div>
      <PetCardFlex>
        <article className="w-full md:w-1/2 lg:w-1/3  px-2 py-4 ">
          <Card bordered className="h-40">
            <Card.Body className="items-center text-center">
              <Card.Title tag="h2">Name - {pet.name}</Card.Title>
              <p className="text-xs">{pet.description}</p>
            </Card.Body>
          </Card>
        </article>

        <article className="w-full md:w-1/2 lg:w-1/3  px-2 py-4  ">
          <Card bordered className="h-40">
            <Card.Body className="items-center text-center">
              <VscTypeHierarchySub className="text-5xl text-primary" />
              <Card.Title tag="h2">Breeds</Card.Title>
              <p>{pet.breeds.primary}</p>
            </Card.Body>
          </Card>
        </article>

        <article className="w-full md:w-1/2 lg:w-1/3  px-2 py-4  ">
          <Card bordered className="h-40">
            <Card.Body className="items-center text-center">
              <VscSymbolColor className="text-5xl text-primary" />
              <Card.Title tag="h2">Colors</Card.Title>
              <p>{pet.colors.primary ?? "N/A"}</p>
            </Card.Body>
          </Card>
        </article>

        <article className="w-full md:w-1/2 lg:w-1/3  px-2 py-4  ">
          <Card bordered className="h-40">
            <Card.Body className="items-center text-center">
              <GiAges className="text-5xl text-primary" />
              <Card.Title tag="h2">Age</Card.Title>
              <p>{pet.age}</p>
            </Card.Body>
          </Card>
        </article>

        <article className="w-full md:w-1/2 lg:w-1/3  px-2 py-4  ">
          <Card bordered className="h-40">
            <Card.Body className="items-center text-center">
              <BsGenderAmbiguous className="text-5xl text-primary" />
              <Card.Title tag="h2">Gender</Card.Title>
              <p>{pet.gender}</p>
            </Card.Body>
          </Card>
        </article>

        <article className="w-full md:w-1/2 lg:w-1/3  px-2 py-4  ">
          <Card bordered className="h-40">
            <Card.Body className="items-center text-center">
              <HiMail className="text-5xl text-primary" />
              <Card.Title tag="h2">Contact</Card.Title>
              <a
                href={`mailto:${pet.contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pet.contact.email}
              </a>
            </Card.Body>
          </Card>
        </article>
      </PetCardFlex>
      <div className="mt-12 flex flex-wrap justify-evenly">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-info w-60 my-2"
          href={`mailto:${pet.contact.email}`}
        >
          Contact <EnvelopeIcon className="ml-1 w-4 h-4 " />
        </a>

        <Button onClick={handleShare} className="w-60 my-2" color="primary">
          Share <ShareIcon className="ml-1 w-4 h-4" />
        </Button>

        <a
          href={pet.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success w-60 my-2"
        >
          More Info <ArrowRightIcon className="ml-1 w-4 h-4 " />
        </a>
      </div>
    </PawHubContainer>
  );
}
