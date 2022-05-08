import { Button, Spinner } from "react-bootstrap";

type FavoriteButtonType = {
  status: boolean;
  add: () => void;
  remove: () => void;
  loading: boolean;
};

const FavoriteButton = ({
  status,
  add,
  remove,
  loading,
}: FavoriteButtonType) => {
  if (loading)
    return (
      <Button variant="outline-primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button>
    );

  if (!status)
    return (
      <Button variant="outline-primary" onClick={add}>
        <i className="bi bi-bookmark-heart"></i>
        <span className="visually-hidden">Add</span>
      </Button>
    );
  return (
    <Button variant="outline-primary" onClick={remove}>
      <i className="bi bi-bookmark-heart-fill"></i>{" "}
      <span className="visually-hidden">Remove</span>
    </Button>
  );
};

export default FavoriteButton;
