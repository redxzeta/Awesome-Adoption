import React from "react";

const PetCardGrid = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-wrap ">{children}</div>;
};

export default PetCardGrid;
