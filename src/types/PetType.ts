export type AnimalPhotos = {
  large: string;
  medium: string;
};

export type PetListType =
  | "Dog"
  | "Cat"
  | "Rabbit"
  | "Horse"
  | "Bird"
  | "dog"
  | "cat"
  | "rabbit"
  | "horse"
  | "bird";

export type PetCardType = {
  id: string;
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
