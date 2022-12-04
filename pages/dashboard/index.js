import { PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import AddDatasetModal from "../../src/components/add-dataset-modal";
import DatasetItem from "../../src/components/dataset-item/dataset-item";
import getDatasets from "../../src/fire-app/getDatasets";
import withAuth from "../../src/utils/withAuth";
import { selectUserData } from "../../store/auth.slice";

export default withAuth(function Dashboard() {
  const router = useRouter();

  const user = useSelector(selectUserData);

  const [openAddDatasetModal, setOpenAddDatasetModal] = useState(false);

  const [loadingDatasets, setLoadingDatasets] = useState(true);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    getDatasets(user.userId, (querySnapshot) => {
      const result = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDatasets(result);
      setLoadingDatasets(false);
    });
  }, []);

  return (
    <>
      <div className={"space-y-4"}>
        <div className={"space-y-2"}>
          <h1 className={"text-3xl sm:text-4xl font-bold"}>Dashboard</h1>
          <p className={"md:text-lg text-gray-500 max-w-lg"}>
            Create a new dataset and collaborate with your team or build your portfolio by building public datasets.
          </p>
          <div className={"flex items-center gap-2"}>
            <button
              onClick={() => {
                setOpenAddDatasetModal(true);
              }}
              className={`flex items-center gap-1 py-2 px-4 bg-black text-white rounded-full`}
            >
              <PlusIcon className={"w-5 h-5"} />
              <span>New Dataset</span>
            </button>

            <button
              onClick={() => {
                router.push("/explore");
              }}
              className={`py-2 px-4 text-black rounded-full`}
            >
              Explore Datasets
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
            <p className={"md:text-lg text-center text-gray-500"}>You have not created any dataset yet, create one to get started!</p>
          </div>
        )}
      </div>

      <AddDatasetModal open={openAddDatasetModal} setOpen={setOpenAddDatasetModal} />
    </>
  );
});
