import React, { Suspense, type FC } from "react";
import { type BreedsData } from "../app/page";
import { DogView } from "./DogView";
interface BreedsGridProps {
  breeds: BreedsData["message"];
}

const DogSuspenseFallback = () => {
  return (
    <div className={`relative mb-2 h-20 w-28 border-2 border-gray-500 p-4`}>
      <p className="absolute bottom-2 z-10 text-black">Loading...</p>
    </div>
  );
};

export const BreedsGrid: FC<BreedsGridProps> = ({ breeds }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-x-16 md:grid-cols-3 ">
        {Object.entries(breeds).map(([breed, subBreeds]) => {
          return [
            <Suspense key={breed} fallback={<DogSuspenseFallback />}>
              <DogView breed={breed} />
            </Suspense>,
            ...subBreeds.map((subBreed) => (
              <Suspense
                key={breed + subBreed}
                fallback={<DogSuspenseFallback />}
              >
                <DogView breed={breed} subBreed={subBreed} />
              </Suspense>
            )),
          ];
        })}
      </div>
    </>
  );
};
