import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoaderComponent({ isLoading, serverError, children }) {
  if (isLoading) {
    return <Spinner data-testid="loading" animation="grow" variant="primary" />;
  }
  if (serverError) {
    return <h1 data-testid="error">Error Loading</h1>;
  }

  return <>{children}</>;
}
