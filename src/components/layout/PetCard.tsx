import React from "react";
import { Button, Card } from "react-daisyui";
import { Link } from "react-router-dom";
import { PetCardType } from "types/PetType";

import { nameCleaner } from "../../utils/utilsCleaner/index";
import Placeholder from "../pets/placeholder-light.png";
import PetIcon from "../shared/PetIcon";

export default function PetCard(
  props: PetCardType & { children?: React.ReactNode }
) {
  const {
    id,
    photos,
    name,
    type,
    primary_photo_cropped: link,
    breeds,
    children
  } = props;

  let myInterval: ReturnType<typeof setTimeout>;

  const onHoverPhoto = (event: React.MouseEvent<HTMLImageElement>) => {
    if (photos && photos.length > 1) {
      clearInterval(myInterval);
      let photoIndex = 0;
      myInterval = setInterval(() => {
        (event.target as HTMLImageElement).src = photos[photoIndex].medium;
        if (photoIndex === photos.length - 1) {
          photoIndex = 0;
        } else {
          photoIndex++;
        }
      }, 1000);
    }
  };

  const onBlurPhoto = (event: React.MouseEvent<HTMLImageElement>) => {
    if (photos.length > 1) {
      (event.target as HTMLImageElement).src = photos[0].medium;
      clearInterval(myInterval);
    }
  };

  return (
    <div className="lg:px-4 px-1  w-full md:w-1/2 lg:w-1/3 my-4 fadeInUp ">
      <Card className="bg-base-100 shadow-xl" bordered>
        <div className="p-6 flex flex-row justify-between">
          {CardText(name)}
          <Link to={`/animal/${id}`}>
            <Button color="primary" size="sm">
              More Info
            </Button>
          </Link>
        </div>
        <Card.Image
          alt={link ? type : `${type} placeholder`}
          src={link?.medium || Placeholder}
          onMouseEnter={onHoverPhoto}
          onMouseLeave={onBlurPhoto}
          className="object-cover h-80 w-full"
        />
        <Card.Body className="flex flex-row justify-center">
          <PetIcon type={type} /> {CardText(breeds.primary)}
        </Card.Body>
      </Card>
      {children}
    </div>
  );
}

const CardText = (title: string) => (
  <span className="font-amatic text-3xl text-neutral font-bold text-ellipsis overflow-hidden whitespace-nowrap">
    {nameCleaner(title)}
  </span>
);
