import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const FavoriteButton = ({ status, action }) => {
  if (!status)
    return <IoIosHeartEmpty onClick={action} className="text-danger" />;
  return <IoIosHeart onClick={action} className="text-danger" />;
};

export default FavoriteButton;
