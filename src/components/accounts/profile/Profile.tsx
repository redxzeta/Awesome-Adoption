import PetCardFlex, {
  PawHubContainer,
} from "components/layout/Grid/PetCardFlex";
import PetCard from "components/layout/PetCard";
import { usePetAuth } from "context/TokenContext";
import { Avatar } from "react-daisyui";
import { useParams } from "react-router-dom";
import { useClient } from "react-supabase";
import { FavoritePets } from "reducers/supaReducer";
import { lookUpPet } from "routes/API";
import useSWR from "swr";
import { multipleFetcher } from "utils/petInfoFetcher";
import { fetchImage, fetchSupaProfile } from "utils/supaFetcher";

import LoadPlaceHolder from "../../shared/PlaceHolderCard";
import CandyLandImg from "./candyland.png";

const settings = { revalidateOnFocus: false };
const Profile = () => {
  const { name } = useParams<{ name: string }>();

  const client = useClient();
  const profileSearch = name;

  const { error: errorProfile, data: profile } = useSWR(
    profileSearch ? [client, profileSearch] : null,
    fetchSupaProfile,
    settings
  );

  const { data: background } = useSWR(
    profile ? [client, profile.background, "profile", CandyLandImg] : null,
    fetchImage,
    settings
  );

  if (errorProfile)
    return (
      <div
        className="flex justify-center items-center"
        style={{ padding: "150px" }}
      >
        <div className="flex flex-col text-center">
          <div className="flex justify-center items-center">
            <img
              style={{ width: 40, height: 40 }}
              src={" https://cdn-icons-png.flaticon.com/512/179/179386.png"}
              alt="background"
            />
          </div>
          <div style={{ fontSize: "30px", fontWeight: 600 }}>OOPS!</div>
          <div>Something went wrong. Please try again later.</div>
        </div>
      </div>
    );
  if (!profile)
    return (
      <div
        className="flex justify-center items-center"
        style={{ padding: "50px" }}
      >
        <img
          src={
            " https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"
          }
          alt="background"
        />
      </div>
    );

  const showFeaturedFavoritedPets = profile.favoritepets.slice(0, 3);
  return (
    <PawHubContainer>
      <section className="flex flex-col justify-center items-center">
        <img src={background} alt="background" className="w-full" />
        <Avatar
          src={profile.avatar_url}
          className="-mt-12"
          border
          borderColor="secondary"
          shape="circle"
          size="lg"
        />

        <h5>{profile.username || "A Pawsome User"}</h5>

        <small>{profile.description}</small>
      </section>

      <ShowFavorites favoritePets={showFeaturedFavoritedPets} />
    </PawHubContainer>
  );
};

export default Profile;

const ShowFavorites = ({ favoritePets }: { favoritePets: FavoritePets[] }) => {
  const { tokenHeaders } = usePetAuth();
  const urlPets = favoritePets.map((f) => lookUpPet + f.pet);

  const { error, data: petList } = useSWR(
    tokenHeaders ? [urlPets, tokenHeaders] : null,
    multipleFetcher
  );

  if (urlPets.length === 0)
    return (
      <>
        <h4>You have not marked a pet as a favorite yet :(</h4>
        <h5>Start selecting your favorites to find your future best friend!</h5>
      </>
    );

  if (error)
    return (
      <>
        <h3>There was a problem getting the pet information :(</h3>
        <h4>Try again later!</h4>
      </>
    );

  if (!petList)
    return (
      <>
        <h2 className="text-5xl font-bold font-amatic">
          Loading Favorite Pets
        </h2>
        <PetCardFlex>
          <LoadPlaceHolder />
          <LoadPlaceHolder />
          <LoadPlaceHolder />
        </PetCardFlex>{" "}
      </>
    );

  return (
    <>
      <h1 className="text-5xl font-bold font-amatic">Favorited Pets</h1>
      <PetCardFlex>
        {petList.map((pet) => (
          <PetCard
            key={pet.id}
            breeds={pet.breeds}
            id={pet.id}
            name={pet.name}
            photos={pet.photos}
            type={pet.type}
            primary_photo_cropped={pet.primary_photo_cropped}
          />
        ))}
      </PetCardFlex>
    </>
  );
};
