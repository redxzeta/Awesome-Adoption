import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoaderComponent({ isLoading, serverError, children }) {
  if (isLoading) {
    return (
      <>
        {" "}
        <Spinner animation="grow" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    );
  }
  if (serverError) {
    return <h1>Error Loading</h1>;
  }

  return <>{children}</>;
}
