import PetCard from "components/layout/PetCard";
import { usePetAuth } from "context/TokenContext";
import { Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useClient } from "react-supabase";
import { FavoritePets } from "reducers/supaReducer";
import { lookUpPet } from "routes/API";
import useSWR from "swr";
import { multipleFetcher } from "utils/petInfoFetcher";
import { fetchImage, fetchSupaProfile } from "utils/supaFetcher";

import LoadPlaceHolder from "../../shared/PlaceHolderCard";
import CandyLandImg from "./candyland.png";
import "./profile.css";

const settings = { revalidateOnFocus: false };
const Profile = () => {
  const { name } = useParams<{ name: string }>();
  // if (!name) return <Navigate to="/" replace={true} />;
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

  if (errorProfile) return <h1>ERROR</h1>;
  if (!profile) return <h1>Loading</h1>;

  const showFeaturedFavoritedPets = profile.favoritepets.slice(0, 3);
  return (
    <Container className="pawhub">
      <main className="profile__section">
        <Image src={background} alt="background" />
        <Image
          src={profile.avatar_url}
          className="profile__img"
          alt="username"
          roundedCircle
        />

        <h5>{profile.username || "A Pawsome User"}</h5>

        <small>{profile.description}</small>

        <ShowFavorites favoritePets={showFeaturedFavoritedPets} />

        {/* <Container className="story-card">
          <Row>
            <Col sm={4}></Col>
            <Col sm={8}>
              <div className="card-body">
                <h1 className="story-title">This is title of story</h1>
                <p>
                  <b>Last Updated -</b> 30 October 2021
                </p>
                <p className="story-body">
                  Auto-layout for flexbox grid columns also means you can set
                  the width of one column and have the sibling columns
                  automatically resize around it. You may use predefined grid
                  classes (as shown below), grid mixins, or inline widths. Note
                  that the other columns will resize no matter the width of the
                  center column.
                </p>
                <Button variant="primary">Read more</Button>
              </div>
            </Col>
          </Row>
        </Container> */}
      </main>
    </Container>
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
      <Container>
        <h4>You have not marked a pet as a favorite yet :(</h4>
        <h5>Start selecting your favorites to find your future best friend!</h5>
      </Container>
    );

  if (error)
    return (
      <Container>
        <h3>There was a problem getting the pet information :(</h3>
        <h4>Try again later!</h4>
      </Container>
    );

  if (!petList)
    return (
      <Container className="pawhub">
        <div className="petList__container">
          <Row className="mb-3 w-100 petList">
            <LoadPlaceHolder />
            <LoadPlaceHolder />
            <LoadPlaceHolder />
          </Row>{" "}
        </div>
      </Container>
    );

  return (
    <Container className="pawhub my-4">
      <div className="petList__container">
        <h1>Favorited Pets</h1>
        <Row className="mb-3 w-100 petList fadeInUp">
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
        </Row>
      </div>
    </Container>
  );
};
