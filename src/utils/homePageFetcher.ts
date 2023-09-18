import { PetSearchType } from "./petTypeFetcher";

async function fetcher(
  url: string,
  tokenHeaders: string
): Promise<PetSearchType> {
  const res = await fetch(url, {
    method: "GET",
    body: null,
    headers: { Authorization: tokenHeaders }
  });
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    // error.info = await res.json();
    // error.status = res.status;
    // throw error;
  }
  const data = await res.json();

  return data;
}

export { fetcher };
