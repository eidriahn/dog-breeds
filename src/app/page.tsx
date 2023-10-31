import axios from "axios";
import { BreedsFilter } from "../components/BreedsFilter";

export interface BreedsData {
  message: Record<string, string[]>;
}

export default async function HomePage() {
  const response = await axios.get<BreedsData>(
    "https://dog.ceo/api/breeds/list/all",
  );

  const data = response.data;

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <BreedsFilter breeds={data.message} />
    </main>
  );
}
