import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/solid";
import Spinner from "components/shared/spinner/Spinner";
import { Button } from "react-daisyui";

type FavoriteButtonType = {
  status: boolean;
  add: () => void;
  remove: () => void;
  loading: boolean;
  favoritedCount: number;
};

const FavoriteButton = ({
  status,
  add,
  remove,
  loading,
  favoritedCount,
}: FavoriteButtonType) => {
  if (loading)
    return (
      <Button disabled>
        <Spinner />
      </Button>
    );

  if (!status)
    return (
      <Button variant="outline" color="primary" onClick={add}>
        <HeartIcon className="w-8 h-8" />
        {favoritedCount !== 0 && <span>{favoritedCount}</span>}
        <span className="sr-only">Add</span>
      </Button>
    );
  return (
    <Button variant="outline" color="primary" onClick={remove}>
      <HeartSolid className="w-8 h-8" />
      <span className="sr-only">Remove</span>
      {favoritedCount !== 0 && <span>{favoritedCount}</span>}
    </Button>
  );
};

export default FavoriteButton;
