import { Fragment } from "react";
import { Button, Spinner } from "react-bootstrap";

export const FetchingButton = ({ fetching, className = "", action }) => (
  <Button
    className={className}
    variant="primary"
    type="submit"
    disabled={fetching}
  >
    {fetching ? (
      <Fragment>
        Loading...
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Fragment>
    ) : (
      action
    )}
  </Button>
);
