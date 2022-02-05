import React from "react";

import spinner from "../../../images/spinner.gif";
import "./spinner.css";

const Spinner = () => (
  <div className="loader">
    <img src={spinner} alt="Loading..." />
  </div>
);

export default Spinner;
