import axios from "axios";
import Image from "next/image";
import React, { use } from "react";

interface ImageApiI {
  message: string;
  status: string;
}

const getImageData = async (breed: string, subBreed?: string) => {
  const response = await axios.get<ImageApiI>(
    `https://dog.ceo/api/breed/${
      subBreed ? breed + "/" + subBreed : breed
    }/images/random`,
  );

  return response.data.message;
};

const fetchMap = new Map<string, Promise<string>>();
const queryClient = (name: string, query: () => Promise<string>) => {
  if (!fetchMap.has(name)) {
    fetchMap.set(name, query());
  }

  return fetchMap.get(name)!;
};

export function DogView({
  breed,
  subBreed,
}: {
  breed: string;
  subBreed?: string;
}) {
  const src = use(
    queryClient(breed + subBreed, getImageData.bind(null, breed, subBreed)),
  );

  return (
    <div className={`relative mb-2 h-20 w-28 border-2 border-gray-500 p-4`}>
      <p className="absolute bottom-2 z-10 text-white">{subBreed ?? breed}</p>
      <Image
        src={src}
        alt={breed}
        fill
        priority
        sizes="(max-width: 768px) 10vw"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
}
