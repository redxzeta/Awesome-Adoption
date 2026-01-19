import { PetListType } from "types/PetType";

import Bird from "./bird.jpg";
import Cat from "./cat.jpg";
import Dog from "./doggo.jpg";
import Horse from "./horse.jpg";
import Rabbit from "./rabbit.jpg";

export type PetLink = {
  type: PetListType;
  img: string;
};

export const linkData: PetLink[] = [
  {
    img: Dog,
    type: "Dog"
  },
  {
    img: Cat,
    type: "Cat"
  },
  {
    img: Bird,
    type: "Bird"
  },
  {
    img: Horse,
    type: "Horse"
  },
  {
    img: Rabbit,
    type: "Rabbit"
  }
];
