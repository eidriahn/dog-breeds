"use client";
import React, { useState, type FC, type ChangeEvent, useMemo } from "react";
import { type BreedsData } from "../app/page";
import { BreedsGrid } from "./BreedsGrid";

interface BreedsFilterProps {
  breeds: BreedsData["message"];
}

export const BreedsFilter: FC<BreedsFilterProps> = ({ breeds }) => {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedSubBreed, setSelectedSubBreed] = useState("");

  const handleBreedSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
    const value = ev.target.value;

    setSelectedBreed(value);
    setSelectedSubBreed("");
  };

  const handleSubBreedSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
    const value = ev.target.value;

    setSelectedSubBreed(value);
  };

  const filteredBreeds = useMemo(() => {
    return selectedBreed
      ? Object.entries(breeds).reduce(
          (acc, [breedName, subBreeds]) => {
            if (breedName !== selectedBreed) {
              return acc;
            }

            return {
              ...acc,
              [breedName]: selectedSubBreed
                ? subBreeds.filter((subBreed) => subBreed === selectedSubBreed)
                : subBreeds,
            };
          },
          {} as BreedsData["message"],
        )
      : breeds;
  }, [breeds, selectedBreed, selectedSubBreed]);

  const subBreeds = breeds[selectedBreed] ?? [];

  return (
    <div>
      <div className="mb-10 mt-5 flex gap-4">
        <select
          className=""
          name="breeds"
          onChange={handleBreedSelect}
          defaultValue={""}
        >
          <option value="">Select a breed</option>
          {Object.keys(breeds).map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        {subBreeds.length > 1 && (
          <select defaultValue={""} onChange={handleSubBreedSelect}>
            <option value="" selected>
              Select a sub-breed
            </option>
            {subBreeds.map((subBreed) => (
              <option key={subBreed} value={subBreed}>
                {subBreed}
              </option>
            ))}
          </select>
        )}
      </div>
      <BreedsGrid breeds={filteredBreeds} />
    </div>
  );
};
