import { Card } from "react-daisyui";
import { Link } from "react-router-dom";

import { linkData } from "./petLinkData";

type AnimalTypeCardProps = {
  type: string;
  img: string;
  link: string;
};

export const AnimalTypeCard = ({ type, img, link }: AnimalTypeCardProps) => {
  let linkDataTypes: string[] = [];
  linkData.forEach(({ type }) => {
    linkDataTypes = [...linkDataTypes, type];
  });
  const isLinkDataType = linkDataTypes.includes(type);

  return (
    <article className="lg:px-4 px-1 w-full md:1/3 lg:w-1/4 my-4 fadeInUp ">
      <Card imageFull>
        <Card.Image src={img} alt={type} className="w-full max-h-80 " />
        <Card.Body>
          <Card.Title tag="h2">
            {type} {isLinkDataType ? "Buddies" : "Buddy"}
          </Card.Title>
          <p>If a {type} chews shoes whose shoes does he choose?</p>
          <Card.Actions className="justify-end">
            <Link to={link} className="btn btn-primary">
              Click Here
            </Link>
          </Card.Actions>
        </Card.Body>
      </Card>
    </article>
  );
};
