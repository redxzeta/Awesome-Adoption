// Pet Type Icons
import ScalesFinIcon from "../components/shared/PetIcon/icons/scalesfins.svg";
import BarnyardIcon from "../shared/PetIcon/icons/barnyard.svg";
import FurryIcon from "../shared/PetIcon/icons/furry.svg";

export type AnimalPhotos = {
  large: string;
  medium: string;
  small: string;
};

export const PET_LIST_CONST = [
  "Dog",
  "Cat",
  "Rabbit",
  "Horse",
  "Bird",
  "dog",
  "cat",
  "rabbit",
  "horse",
  "bird",
] as const;

export type PetType = {
  type: string;
  img: string;
};

export const typeData: PetType[] = [
  {
    type: "small-furry",
    img: FurryIcon,
  },
  {
    type: "scales-fins-other",
    img: ScalesFinIcon,
  },
  {
    type: "barnyard",
    img: BarnyardIcon,
  },
];

export type PetListType = typeof PET_LIST_CONST[number];

export type PetCardType = {
  id: number;
  photos: AnimalPhotos[];
  name: string;
  type: PetListType;
  primary_photo_cropped?: {
    medium: string;
  };
  breeds: {
    primary: string;
  };
};
