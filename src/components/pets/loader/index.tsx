import { PawHubContainer } from "components/layout/Grid/PetCardFlex";
import { PetListType } from "types/PetType";

import PetImg from "./PetErrorImg.jpg";

export const PetErrorLoading = ({ type }: { type?: PetListType }) => (
  <PawHubContainer>
    <h1>Error Loading {type} Buddies</h1>
    <img src={PetImg} alt="petLoading" className="w-100" />
    <p>Please Try Again Later</p>
    Photo by
    <a href="https://unsplash.com/@anshaaleena?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
      Anusha Barwa
    </a>
    on
    <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </PawHubContainer>
);
