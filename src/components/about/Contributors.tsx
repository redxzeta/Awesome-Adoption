import Spinner from "components/shared/spinner/Spinner";
import { Tooltip } from "react-daisyui";
import useSWR from "swr";

import { githubURL } from "../../routes/API";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return res.json();
};

type ContributorsType = {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
};

const Contributors = () => {
  const { data, error } = useSWR(githubURL, fetcher);
  const isLoading = !error && !data;
  if (isLoading) return <Spinner />;

  if (error) {
    return <h1>Error Loading</h1>;
  }

  return (
    <div className="flex flex-row justify-center items-center flex-wrap my-4 " id="contributors">
      {data.map((a: ContributorsType) => (
        <a
          key={a.avatar_url}
          className="rounded-sm my-2"
          href={a.html_url}
          target="_blank"
          rel="noreferrer"
          data-testid="contributor-list"
        >
          <Tooltip message={a.login}>
            <img
              className="w-12 mx-1 border-primary border-2 rounded-full"
              src={a.avatar_url}
              alt={`${a.login} Contributor Avatar`}
            />
          </Tooltip>
        </a>
      ))}
    </div>
  );
};

export default Contributors;
