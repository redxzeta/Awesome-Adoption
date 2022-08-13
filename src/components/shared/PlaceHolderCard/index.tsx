import { Card } from "react-daisyui";

const PlaceHolderCard = () => (
  <div className="lg:px-4 px-1  w-full md:w-1/2 lg:w-1/3 my-4" role="status">
    <Card className="bg-base-100 shadow-xl" bordered>
      <div className="p-6 flex flex-row justify-between h-20">
        <div className=" animate-pulse  w-1/3 bg-neutral object-cover"></div>
        <div className=" animate-pulse  w-1/3 bg-primary object-cover"></div>
      </div>
      <div className="object-cover h-80 w-full animate-pulse  bg-primary" />
      <Card.Body className="flex flex-row justify-center h-20">
        <div className=" animate-pulse  w-1/3 bg-neutral object-cover"></div>
      </Card.Body>
    </Card>
  </div>
);

export default PlaceHolderCard;
