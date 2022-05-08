import { Fragment } from "react";
import { Button, Spinner } from "react-bootstrap";

type FetchingButtonType = {
  fetching: boolean;
  action: string;
  className?: string;
};

export const FetchingButton = ({
  fetching,
  className = "",
  action,
}: FetchingButtonType) => (
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
