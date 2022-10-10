import { PetListType } from "types/PetType";

import { ReactComponent as BirdIcon } from "./icons/bird.svg";
import { ReactComponent as CatIcon } from "./icons/cat.svg";
import { ReactComponent as DogIcon } from "./icons/dog.svg";
import { ReactComponent as HorseIcon } from "./icons/horse.svg";
import { ReactComponent as HouseIcon } from "./icons/house.svg";
import { ReactComponent as RabbitIcon } from "./icons/rabbit.svg";

const PetIcon = ({ type }: { type: PetListType }) => {
  if (type === "Dog") {
    return <DogIcon className="w-10 h-auto mr-1 fill-current" />;
  } else if (type === "Cat") {
    return <CatIcon className="w-10 h-auto mr-1 fill-current" />;
  } else if (type === "Bird") {
    return <BirdIcon className="w-10 h-auto mr-1 fill-current" />;
  } else if (type === "Horse") {
    return <HorseIcon className="w-10 h-auto mr-1 fill-current" />;
  } else if (type === "Rabbit") {
    return <RabbitIcon className="w-10 h-auto mr-1 fill-current" />;
  } else {
    return <HouseIcon className="w-10 h-auto mr-1 fill-current" />;
  }
};

export default PetIcon;
