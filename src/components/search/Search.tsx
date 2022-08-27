import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import { Avatar } from "react-daisyui";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
import { useClient } from "react-supabase";
import useSWR from "swr";
import { fetchSearchProfiles } from "utils/supaFetcher";

const settings = { revalidateOnFocus: false };
const Search = () => {
  //   const { name = "" } = useParams<{ name: string }>();

  const client = useClient();
  //   const profileSearch = "";

  const { error: errorProfile, data: profiles } = useSWR(
    client,
    fetchSearchProfiles,
    settings
  );

  console.log("Searching");

  if (errorProfile) return <h1>ERROR</h1>;
  if (!profiles) return <h1>Loading</h1>;
  console.log({ profiles });
  return (
    <PawHubContainer>
      <div className="flex flex-row flex-wrap justify-between">
        {profiles.map((profile) => {
          return (
            <Link
              to={`/profile/${profile.username}`}
              className="flex flex-col items-center bg-white border rounded border-[#737b35] p-4 m-3 min-w-[30%]"
              key={profile.id}
            >
              <Avatar
                src={profile.avatar_url}
                className=""
                border
                borderColor="secondary"
                shape="circle"
                size="lg"
              />

              <h5 className="mt-5">{profile.username || "A Pawsome User"}</h5>

              <small className="w-2/3 whitespace-pre-line">
                {profile.description}
              </small>
            </Link>
          );
        })}
      </div>
    </PawHubContainer>
  );
};

export default Search;
