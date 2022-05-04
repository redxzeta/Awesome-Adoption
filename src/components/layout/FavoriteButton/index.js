import { Button, Spinner } from "react-bootstrap";

const FavoriteButton = ({ status, add, remove, loading }) => {
  if (loading)
    return (
      <Button variant="outline-primary" size="md" disabled>
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
      <Button variant="outline-primary" size="md" onClick={add}>
        <i className="bi bi-bookmark-heart" alt="Add"></i>
        <span className="visually-hidden">Add</span>
      </Button>
    );
  return (
    <Button variant="outline-primary" size="md" onClick={remove}>
      <i className="bi bi-bookmark-heart-fill" alt="Remove"></i>{" "}
      <span className="visually-hidden">Remove</span>
    </Button>
  );
};

export default FavoriteButton;
