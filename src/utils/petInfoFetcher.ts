import { PetCardType, PetListType } from "types/PetType";

type PetInfo =
  | (PetCardType & {
      url: string;
      type: PetListType;
      contact: {
        email: string;
      };
      colors: {
        primary: string;
      };
      age: string;
      gender: string;
      description: string;
    })
  | undefined;

async function fetcher(
  url: string,
  tokenHeaders: string,
  multi?: boolean
): Promise<PetInfo> {
  const res = await fetch(url, {
    method: "GET",
    body: null,
    headers: { Authorization: tokenHeaders },
  });
  if (!res.ok) {
    if (multi) {
      return undefined;
    }
    throw new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    // error.info = await res.json();
    // error.status = res.status;
    // throw error;
  }
  const data = await res.json();
  if (data.animal) {
    return data.animal;
  } else {
    return data.animals[0];
  }
}
const multipleFetcher = (
  urls: string[],
  tokenHeaders: string
): Promise<Array<PetInfo>> =>
  Promise.all(urls.map((u) => fetcher(u, tokenHeaders, true)));

export { fetcher, multipleFetcher };
