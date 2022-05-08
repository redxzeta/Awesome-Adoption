import { PetListType } from "types/PetType";

import BirdIcon from "../../../images/icons/bird.png";
import CatIcon from "../../../images/icons/cat.png";
import DogIcon from "../../../images/icons/dog.png";
import HorseIcon from "../../../images/icons/horse.png";
import RabbitIcon from "../../../images/icons/rabbit.png";
import "./petIcon.css";

const PetIcon = ({ type }: { type: PetListType }) => {
  const ICONS = {
    Dog: DogIcon,
    Cat: CatIcon,
    Rabbit: RabbitIcon,
    Horse: HorseIcon,
    Bird: BirdIcon,
  };

  return <img src={ICONS[type]} alt={`${type} icon`} className="pet-icon" />;
};

export default PetIcon;
