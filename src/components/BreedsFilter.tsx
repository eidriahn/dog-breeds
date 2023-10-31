"use client";
import React, { useState, type FC, type ChangeEvent } from "react";
import { type BreedsData } from "../app/page";
import { BreedsGrid } from "./BreedsGrid";

interface BreedsFilterProps {
  breeds: BreedsData["message"];
}

export const BreedsFilter: FC<BreedsFilterProps> = ({ breeds }) => {
  console.log(`🚀 => breeds:`, breeds);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedSubBreed, setSelectedSubBreed] = useState("");

  const handleSelectChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const value = ev.target.value;

    setSelectedBreed(value);
  };

  const filteredBreeds = selectedBreed
    ? Object.entries(breeds).reduce(
        (acc, [breedName, subBreeds]) => {
          if (breedName !== selectedBreed) {
            return acc;
          }

          return { ...acc, [breedName]: subBreeds };
        },
        {} as BreedsData["message"],
      )
    : breeds;

  const subBreeds = breeds[selectedBreed] ?? [];

  return (
    <div>
      <div className="mb-10 flex gap-4">
        <select
          className=""
          name="breeds"
          placeholder="Select a breed"
          onChange={handleSelectChange}
          defaultValue={""}
        >
          <option value="" disabled selected>
            Select a breed
          </option>

          {Object.keys(breeds).map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        {subBreeds.length > 0 && (
          <select defaultValue={""}>
            <option value="" disabled selected>
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
