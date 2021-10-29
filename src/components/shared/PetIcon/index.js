import React from "react";
import DogIcon from "../../../images/icons/dog.png";
import CatIcon from "../../../images/icons/cat.png";
import RabbitIcon from "../../../images/icons/rabbit.png";
import HorseIcon from "../../../images/icons/horse.png";
import BirdIcon from "../../../images/icons/bird.png";
import "./petIcon.css";

const PetIcon = ({ type }) => {
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
