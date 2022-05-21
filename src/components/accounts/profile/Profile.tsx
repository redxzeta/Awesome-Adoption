import { PostgrestError } from "@supabase/supabase-js";
import PetCard from "components/layout/PetCard";
import { usePetAuth } from "context/TokenContext";
import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { useClient } from "react-supabase";
import { FavoritePets, IProfileUpdate } from "reducers/supaReducer";
import { lookUpPet } from "routes/API";
import useSWR from "swr";
import { multipleFetcher } from "utils/petInfoFetcher";

import LoadPlaceHolder from "../../shared/PlaceHolderCard";
import CandyLandImg from "./candyland.png";
import "./profile.css";

export type ProfileType = {
  avatar_url: string;
  description: string;
} & IProfileUpdate;

const Profile = () => {
  const { name } = useParams<{ name: string }>();
  if (!name) return <Navigate to="/" replace={true} />;

  const profileSearch = name;
  const client = useClient();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorProfile, setErrorProfile] = useState<PostgrestError | null>();

  const fetchProfile = async () => {
    setLoading(true);
    setErrorProfile(null);
    try {
      const { data, error } = await client
        .from<ProfileType>("profiles")
        .select("*, favoritepets(id,pet,created_at) ")
        .eq("username", profileSearch)

        .single();
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      setProfile(null);
      setErrorProfile(error as PostgrestError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <h1>Loading</h1>;

  if (errorProfile || !profile) return <h1>ERROR</h1>;

  const showFeaturedFavoritedPets = profile.favoritepets.slice(0, 3);
  return (
    <Container className="pawhub">
      <main className="profile__section">
        <Image src={CandyLandImg} alt="background" />
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

  if (urlPets.length === 0)
    return (
      <Container>
        <h4>You have not marked a pet as a favorite yet :(</h4>
        <h5>Start selecting your favorites to find your future best friend!</h5>
      </Container>
    );

  const { error, data: petList } = useSWR(
    tokenHeaders ? [urlPets, tokenHeaders] : null,
    multipleFetcher
  );

  const isLoading = !petList && !error;
  if (isLoading)
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

  if (error || !petList)
    return (
      <Container>
        <h3>There was a problem getting the pet information :(</h3>
        <h4>Try again later!</h4>
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
