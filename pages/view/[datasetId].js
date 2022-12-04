import { ClockIcon, CloudArrowDownIcon, HeartIcon, UserIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import DatasetDescription from "../../src/components/dataset-description";
import DatasetHistory from "../../src/components/dataset-history";
import getDatasetData from "../../src/fire-app/getDatasetData";
import toggleUpvote from "../../src/fire-app/toggleUpvote";
import timeSince from "../../src/utils/timeSince";
import withAuth from "../../src/utils/withAuth";
import { selectUserData, setUserData } from "../../store/auth.slice";

export default withAuth(function ViewDateset() {
  const dispatch = useDispatch();

  const router = useRouter();
  const datasetId = router.query.datasetId;

  const [loadingDatasetData, setLoadingDatasetData] = useState(true);
  const [datasetData, setDatasetData] = useState({});

  const user = useSelector(selectUserData);
  const isUpvoted = user.upvotedDatasets?.includes(datasetId);

  const handleUpvote = async () => {
    await toggleUpvote(isUpvoted, user.userId, datasetId);
    dispatch(
      setUserData({
        ...user,
        upvotedDatasets: isUpvoted
          ? user.upvotedDatasets.filter((upvotedDatasetId) => upvotedDatasetId !== datasetId)
          : [...(user.upvotedDatasets || []), datasetId],
      })
    );
  };

  const handleDownload = () => {
    const latestVersion = datasetData.versions[datasetData.versions.length - 1];

    if (latestVersion.fileName.split(".")[1] === "zip") {
      window.open(`https://${latestVersion.cid}`);
    } else {
      axios.get(`https://${latestVersion.cid}`).then((res) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([res.data]));
        // Create an "a" element and set href to the generated download URL
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${latestVersion.fileName}`);
        // Start download
        link.click();
        // Clean up and remove the link
        link.remove();
      });
    }
  };

  useEffect(() => {
    if (datasetId) {
      getDatasetData(datasetId, (doc) => {
        const result = { id: doc.id, ...doc.data() };
        setDatasetData(result);
        setLoadingDatasetData(false);
      });
    }
  }, [datasetId]);

  return loadingDatasetData ? (
    <ClipLoader size={50} color={"#010101"} />
  ) : (
    <>
      <div className={"space-y-4"}>
        <div className={"space-y-2"}>
          <div className={"flex flex-wrap items-center gap-2 text-gray-500"}>
            <div className={"flex items-center gap-2"}>
              <UserIcon className={"w-5 h-5"} />
              <span>{datasetData.owner}</span>
            </div>

            <span>&middot;</span>

            <div className={"flex items-center gap-2"}>
              <ClockIcon className={"w-5 h-5"} />
              <span>{timeSince(datasetData.updatedOn)} ago</span>
            </div>
          </div>

          <h1 className={"text-3xl sm:text-4xl font-bold"}>{datasetData.name}</h1>
          <p className={"md:text-lg text-gray-500 max-w-lg"}>{datasetData.subtitle}</p>

          <div className={"flex items-center gap-2"}>
            <button onClick={handleDownload} className={`flex items-center gap-2 py-2 px-4 bg-black text-white rounded-full`}>
              <CloudArrowDownIcon className={"w-5 h-5 mb-1"} />
              <span>Download {datasetData.versions[datasetData.versions.length - 1].size}</span>
            </button>

            <button
              onClick={handleUpvote}
              className={`flex items-stretch rounded-full overflow-hidden p-2 ${isUpvoted ? "bg-red-500" : "border border-gray-200"}`}
            >
              <HeartIcon className={`w-5 h-5 ${isUpvoted ? "text-white" : ""}`} />
            </button>
          </div>
        </div>

        <div className={"w-full h-px bg-gray-200"} />

        <div className={"grid grid-cols-12 items-start gap-4"}>
          <DatasetDescription datasetData={datasetData} />
          <DatasetHistory datasetData={datasetData} />
        </div>
      </div>
    </>
  );
});
