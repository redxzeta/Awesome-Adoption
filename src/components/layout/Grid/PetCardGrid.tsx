import React from "react";

const PetCardGrid = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid grid-cols-3 gap-4 ">{children}</div>;
};

export default PetCardGrid;
