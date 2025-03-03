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

async function fetcher(tokenHeaders: string, multi?: boolean): Promise<PetInfo> {
  const url = tokenHeaders[0];
  const bearer = tokenHeaders[1];
  const res = await fetch(url, {
    method: "GET",
    body: null,
    headers: { Authorization: bearer }
  });
  if (!res.ok) {
    if (multi) {
      return undefined;
    }
    throw new Error("An error occurred while fetching the data.");
  }
  const data = await res.json();
  if (data.animal) {
    return data.animal;
  } else {
    return data.animals[0];
  }
}
const multipleFetcher = (urls: string[], tokenHeaders: string): Promise<Array<PetInfo>> =>
  Promise.all(urls.map(() => fetcher(tokenHeaders, true)));

export { fetcher, multipleFetcher };
