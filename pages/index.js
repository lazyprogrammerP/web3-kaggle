import Navbar from "../src/components/navbar";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <Navbar />

      <div
        className={"flex flex-col items-center justify-center gap-4 p-6"}
        style={{
          height: "calc(100vh - 88px)",
        }}
      >
        <h1 className={"text-3xl sm:text-4xl md:text-6xl font-bold max-w-lg md:max-w-2xl text-center"}>
          Start With More Than A{" "}
          <span className={"text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-pink-500"}>Blinking Cursor.</span>
        </h1>
        <p className={"md:text-lg text-gray-500 max-w-lg md:max-w-2xl text-center"}>
          With Caddle, you can store datasets, create data pipeline and discover trending datasets to train your awesome ML model.
        </p>
        <div className={"flex items-center justify-center gap-4"}>
          <button
            onClick={() => {
              router.push("/explore");
            }}
            className={"bg-gradient-to-br from-yellow-300 to-pink-500 text-white py-2 px-4 rounded-full"}
          >
            Explore Datasets
          </button>
          <button className={"py-2 px-4 rounded-full flex items-center gap-2 border border-gray-500"}>
            <span>Watch Demo</span>
            <PlayCircleIcon className={"w-5 h-5"} />
          </button>
        </div>
      </div>
    </div>
  );
}
