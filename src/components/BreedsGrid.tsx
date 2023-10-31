import React, { type FC } from "react";
import { type BreedsData } from "../app/page";

interface BreedsGridProps {
  breeds: BreedsData["message"];
}

export const BreedsGrid: FC<BreedsGridProps> = ({ breeds }) => {
  return (
    <div className="grid grid-cols-1 gap-x-16 md:grid-cols-3">
      {Object.keys(breeds).map((breed) => {
        return (
          <div key={breed} className="mb-2  h-16 border-2 border-red-500 p-4">
            {breed}
          </div>
        );
      })}
    </div>
  );
};
