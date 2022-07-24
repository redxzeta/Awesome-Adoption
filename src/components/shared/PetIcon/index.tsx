import { PetListType } from "types/PetType";

import BirdIcon from "./icons/bird.png";
import CatIcon from "./icons/cat.png";
import DogIcon from "./icons/dog.png";
import HorseIcon from "./icons/horse.png";
import HouseIcon from "./icons/house.png";
import RabbitIcon from "./icons/rabbit.png";
import "./petIcon.css";

const PetIcon = ({ type }: { type: PetListType }) => {
  const ICONS = {
    Dog: DogIcon,
    Cat: CatIcon,
    Rabbit: RabbitIcon,
    Horse: HorseIcon,
    Bird: BirdIcon,
  };

  return (
    <img
      src={ICONS[type] || HouseIcon}
      alt={`${type} icon`}
      className="w-10 h-auto mr-1"
    />
  );
};

export default PetIcon;
