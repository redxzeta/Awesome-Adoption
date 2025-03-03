import { PetCardType } from "types/PetType";

export type PetSearchType = {
  pagination: {
    total_pages: number;
  };
  animals: PetCardType[];
};

async function fetcher(tokenHeaders: string): Promise<PetSearchType> {
  const url = tokenHeaders[0];
  const bearer = tokenHeaders[1];
  const res = await fetch(url, {
    method: "GET",
    body: null,
    headers: { Authorization: bearer }
  });
  if (!res.ok) {
    throw new Error("An error occurred while fetching the data");
  }
  const data = await res.json();
  return data;
}

export { fetcher };
