import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import DatasetItem from "../../src/components/dataset-item/dataset-item";
import getPublicDatasets from "../../src/fire-app/getPublicDatasets";
import withAuth from "../../src/utils/withAuth";
import { selectUserData } from "../../store/auth.slice";

export default withAuth(function ExploreDatasets() {
  const user = useSelector(selectUserData);

  const [loadingDatasets, setLoadingDatasets] = useState(true);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    getPublicDatasets(user.userId, (querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDatasets(result);
      setLoadingDatasets(false);
    });
  }, [user]);

  return (
    <div className={"space-y-4"}>
      <div className={"space-y-2"}>
        <h1 className={"text-3xl sm:text-4xl font-bold"}>Explore Datasets</h1>
        <p className={"md:text-lg text-gray-500 max-w-lg"}>
          Search across the enormous datasets provided by the community and find your next research idea.
        </p>

        <div className={"w-full flex items-center gap-8"}>
          <div className={"flex-1 flex items-center gap-2 py-2 px-4 rounded-full border border-gray-200"}>
            <MagnifyingGlassIcon className={"w-5 h-5 mb-1"} />
            <input placeholder={"Search for datasets"} className={"flex-1 focus:outline-none"} />
          </div>

          <button className={"flex items-center gap-2"}>
            <FunnelIcon className={"w-5 h-5"} />
            <span className={"hidden md:block"}>Apply Filters</span>
          </button>
        </div>
      </div>

      <div className={"w-full h-px bg-gray-200"} />

      {loadingDatasets ? (
        <ClipLoader size={50} color={"#010101"} />
      ) : datasets.length ? (
        <div className={"space-y-4"}>
          {datasets.map((dataset) => (
            <DatasetItem key={dataset.id} dataset={dataset} />
          ))}
        </div>
      ) : (
        <div className={"w-11/12 max-w-sm mx-auto"}>
          <div className={"w-full h-auto aspect-square relative"}>
            <Image fill objectFit={"contain"} src={"/data-not-found.png"} />
          </div>
          <p className={"md:text-lg text-center text-gray-500"}>No public datasets found. Keep an eye out for updates by the community.</p>
        </div>
      )}
    </div>
  );
});
