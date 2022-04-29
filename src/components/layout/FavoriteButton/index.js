import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const FavoriteButton = ({ status, add }) => {
  if (!status) return <IoIosHeartEmpty onClick={add} className="text-danger" />;
  return <IoIosHeart onClick={add} className="text-danger" />;
};

export default FavoriteButton;
