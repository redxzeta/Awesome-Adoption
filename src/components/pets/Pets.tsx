import PetCardFlex, { PawHubContainer } from "components/layout/Grid/PetCardFlex";

import { AnimalTypeCard } from "./AnimalTypeCard";
import { linkData } from "./petLinkData";
import { RandomPet } from "./RandomPet";

export default function Pets() {
  return (
    <PawHubContainer>
      <h1 className="text-5xl font-bold font-amatic mb-10">Adopt Your Buddy</h1>

      <PetCardFlex>
        {linkData.map(pet => (
          <AnimalTypeCard img={pet.img} type={pet.type} link={`${pet.type.toLowerCase()}`} key={pet.type} />
        ))}
        <RandomPet />
      </PetCardFlex>
    </PawHubContainer>
  );
}

// Re-export for backward compatibility
export { AnimalTypeCard as AnimalType } from "./AnimalTypeCard";
