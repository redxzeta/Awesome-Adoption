import PetCardFlex, {
  PawHubContainer,
} from "components/layout/Grid/PetCardFlex";
import { useState } from "react";
import { Button } from "react-daisyui";
import { useDelete } from "react-supabase";
import { removeFavoritePet } from "reducers/supaFunctions";
import useSWR from "swr";

import { useAuth } from "../../context/SupaContext";
import { usePetAuth } from "../../context/TokenContext";
// import { FavoritePets } from "../../reducers/supaReducer";
import { lookUpPet } from "../../routes/API";
import { multipleFetcher } from "../../utils/petInfoFetcher";
import PetCard from "../layout/PetCard";
import LoadPlaceHolder from "../shared/PlaceHolderCard";

export default function Favorites() {
  const { favoritePets } = useAuth();
  const { tokenHeaders } = usePetAuth();
  const [{ fetching }, executeDelete] = useDelete("favoritepets");

  const { dispatch } = useAuth();
  const urlPets = favoritePets.map((f) => lookUpPet + f.pet);
  const { error, data: petList } = useSWR(
    tokenHeaders ? [urlPets, tokenHeaders] : null,
    multipleFetcher
  );
  const [petLst, setPetLst] = useState(petList);
  if (urlPets.length === 0)
    return (
      <PawHubContainer>
        <h4>You have not marked a pet as a favorite yet :(</h4>
        <h5>Start selecting your favorites to find your future best friend!</h5>
      </PawHubContainer>
    );

  const isLoading = !petList && !error;
  if (isLoading)
    return (
      <PawHubContainer>
        <h2 className="text-5xl font-bold font-amatic">
          Loading Favorite Pets
        </h2>
        <PetCardFlex>
          <LoadPlaceHolder />
          <LoadPlaceHolder />
          <LoadPlaceHolder />
        </PetCardFlex>{" "}
      </PawHubContainer>
    );

  if (error || !petList)
    return (
      <PawHubContainer>
        <h3>There was a problem getting the pet information :(</h3>
        <h4>Try again later!</h4>
      </PawHubContainer>
    );

  const removeFavButton = async (petId: string | number) => {
    // use petId to find the id associated in FavoritePets array
    // hint pet === petId
    // then get the id and replace removalId
    const removedPet = favoritePets.filter(
      (fav) => fav.pet === petId.toString()
    )[0];
    await executeDelete((query) => query.eq("id", removedPet.id), {
      returning: "minimal",
      count: "estimated",
    });
    dispatch(removeFavoritePet(removedPet.id));
  };

  function filterList(petType: string) {
    let filtered;
    if (petType === "All-favorites") {
      filtered = petList;
    } else {
      filtered = petList?.filter((pet) => pet?.type === petType);
    }
    return filtered;
  }

  const handleClick = (e: any) => {
    const pet = e.target.innerText;
    setPetLst(filterList(pet));
  };

  return (
    <PawHubContainer>
      <h1 className="font-amatic text-5xl font-bold">Your favorite Buddies!</h1>
      <div className="dropdown dropdown-right drop-shadow-lg z-10 mt-5">
        <label tabIndex={0} className="btn m-1">
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li id="all-favorites" onClick={handleClick}>
            <a>All-favorites</a>
          </li>
          <li id="Cat" onClick={handleClick}>
            <a>Cat</a>
          </li>
          <li id="Dog" onClick={handleClick}>
            <a>Dog</a>
          </li>
          <li id="Horse" onClick={handleClick}>
            <a>Horse</a>
          </li>
          <li id="Rabbit" onClick={handleClick}>
            <a>Rabbit</a>
          </li>
          <li id="Bird" onClick={handleClick}>
            <a>Bird</a>
          </li>
        </ul>
      </div>
      <PetCardFlex>
        {petLst
          ? petLst.map((pet) => {
              if (!pet) return null;
              return (
                <PetCard
                  key={pet.id}
                  breeds={pet.breeds}
                  id={pet.id}
                  name={pet.name}
                  photos={pet.photos}
                  type={pet.type}
                  primary_photo_cropped={pet.primary_photo_cropped}
                >
                  {" "}
                  <Button
                    color="primary"
                    className="w-full mx-auto mt-2"
                    onClick={() => removeFavButton(pet.id)}
                  >
                    {fetching ? "Loading" : "Remove"}
                  </Button>
                </PetCard>
              );
            })
          : petList.map((pet) => {
              if (!pet) return null;
              return (
                <PetCard
                  key={pet.id}
                  breeds={pet.breeds}
                  id={pet.id}
                  name={pet.name}
                  photos={pet.photos}
                  type={pet.type}
                  primary_photo_cropped={pet.primary_photo_cropped}
                >
                  {" "}
                  <Button
                    color="primary"
                    className="w-full mx-auto mt-2"
                    onClick={() => removeFavButton(pet.id)}
                  >
                    {fetching ? "Loading" : "Remove"}
                  </Button>
                </PetCard>
              );
            })}
      </PetCardFlex>
    </PawHubContainer>
  );
}
