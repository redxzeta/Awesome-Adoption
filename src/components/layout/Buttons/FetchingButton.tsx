import Spinner from "components/shared/spinner/Spinner";
import { Button } from "react-daisyui";

type FetchingButtonType = {
  fetching: boolean;
  action: string;
  className?: string;
};

export const FetchingButton = ({ fetching, className = "", action }: FetchingButtonType) => (
  <Button className={className} color="primary" type="submit" disabled={fetching}>
    {fetching ? (
      <>
        <Spinner />
      </>
    ) : (
      action
    )}
  </Button>
);
