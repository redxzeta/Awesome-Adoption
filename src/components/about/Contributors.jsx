import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import useSWR from "swr";

import { githubURL } from "../../routes/API";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const Contributors = () => {
  const { data, error } = useSWR(githubURL, fetcher);
  const isLoading = !error && !data;
  if (isLoading)
    return (
      <Spinner animation="grow" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  if (error) {
    return <h1>Error Loading</h1>;
  }
  return (
    <div className="contributors" id="contributors">
      {data.map((a) => (
        <OverlayTrigger
          key={a.id}
          overlay={<Tooltip id="tooltip-disabled">{a.login}</Tooltip>}
        >
          <a
            className="contributor-link"
            href={a.html_url}
            target="_blank"
            rel="noreferrer"
            data-testid="contributor-list"
          >
            <img
              className="contributor-avatar"
              src={a.avatar_url}
              alt={`${a.login} Contributor Avatar`}
            />
          </a>
        </OverlayTrigger>
      ))}
    </div>
  );
};

export default Contributors;
