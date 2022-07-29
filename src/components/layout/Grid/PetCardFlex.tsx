import React from "react";

const PetCardFlex = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-wrap ">{children}</div>;
};

export default PetCardFlex;
