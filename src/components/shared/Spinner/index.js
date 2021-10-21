import React from "react";
import "./spinner.css";

import spinner from "../../../images/paw.gif";

const Spinner = () => (
  <div className="loader">
    <img src={spinner} alt="Loading..." />
  </div>
);

export default Spinner;
