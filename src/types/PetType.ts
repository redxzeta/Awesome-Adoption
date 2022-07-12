export type AnimalPhotos = {
  large: string;
  medium: string;
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
