import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import { useState } from "react";
import { Avatar } from "react-daisyui";
import { Link } from "react-router-dom";
import { useClient } from "react-supabase";
import useSWR from "swr";
import { fetchSearchProfiles } from "utils/supaFetcher";

const settings = { revalidateOnFocus: false };

const SearchInput = () => {
  return (
    <div className="w-full flex justify-center mb-12">
      <input
        type="text"
        className="w-10/12 h-12 border rounded p-4"
        placeholder="Enter a profile to search"
      />
    </div>
  );
};

const Search = () => {
  const [page, setPage] = useState(1);
  const client = useClient();

  const { error: errorProfile, data: profiles } = useSWR(
    [client, page],
    fetchSearchProfiles,
    settings
  );

  const incrementPage = () => {
    const totalPages = Math.floor((profiles?.count ?? 0) / 10);
    page < totalPages && setPage((page) => page + 1);
  };
  const decrementPage = () => page > 1 && setPage((page) => page - 1);

  if (errorProfile) return <h1>ERROR</h1>;
  if (!profiles?.data) return <h1>Loading</h1>;

  return (
    <PawHubContainer>
      <SearchInput />
      <div className="flex flex-row flex-wrap justify-between">
        {profiles.data.map((profile) => {
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
      <Pagination
        incrementPage={incrementPage}
        decrementPage={decrementPage}
        pageNumber={page}
      />
    </PawHubContainer>
  );
};

const Pagination = ({
  incrementPage,
  decrementPage,
  pageNumber,
}: {
  incrementPage: () => void;
  decrementPage: () => void;
  pageNumber: number;
}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <button type="button" onClick={decrementPage} className="text-3xl">
        ◀️
      </button>
      <span className="mx-6 text-xl">{pageNumber}</span>
      <button type="button" onClick={incrementPage} className={"text-3xl"}>
        ▶️
      </button>
    </div>
  );
};

export default Search;
