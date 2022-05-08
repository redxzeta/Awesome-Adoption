import { PetCardType } from "types/PetType";

export type PetSearchType = {
  pagination: {
    total_pages: number;
  };
  animals: PetCardType[];
};

async function fetcher(
  url: string,
  tokenHeaders: string
): Promise<PetSearchType> {
  const res = await fetch(url, {
    method: "GET",
    body: null,
    headers: { Authorization: tokenHeaders },
  });
  if (!res.ok) {
    throw new Error("An error ocurred while fetching the data");
    // error.info = await res.json();
    // error.status = res.status;
    // throw error;
  }
  const data = await res.json();
  return data;
}

export { fetcher };
