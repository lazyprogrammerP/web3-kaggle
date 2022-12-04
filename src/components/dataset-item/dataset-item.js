import { ArrowSmallRightIcon, EllipsisVerticalIcon, HeartIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import toggleUpvote from "../../../src/fire-app/toggleUpvote";
import timeSince from "../../../src/utils/timeSince";
import { selectUserData, setUserData } from "../../../store/auth.slice";
import deleteDataset from "../../fire-app/deleteDataset";
import EditDatasetModal from "../edit-dataset-modal";

export default function DatasetItem({ dataset }) {
  const router = useRouter();

  const dispatch = useDispatch();

  const user = useSelector(selectUserData);
  const datasetId = dataset.id;
  const isUpvoted = user.upvotedDatasets?.includes(datasetId);

  const [openSettings, setOpenSettings] = useState(false);

  const [openEditDatasetModal, setOpenEditDatasetModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const handleEdit = () => {
    setOpenEditDatasetModal(true);
    setOpenSettings(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure that you want to delete this dataset? This action is irreversible!")) {
      setDeleting(true);
      await deleteDataset(datasetId);
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className={"p-4 border border-gray-200 rounded-md flex items-center gap-2"}>
        <div className={"flex-1 space-y-1"}>
          <div className={"flex items-center gap-2"}>
            <h3
              className={"text-lg font-semibold"}
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                overflow: "hidden",
              }}
            >
              {dataset.name}
            </h3>

            <span className={"hidden md:inline-block lg:hidden xl:block"}>&middot;</span>
            <span className={"text-sm text-gray-500 hidden md:inline-block lg:hidden xl:block"}>
              {dataset.public ? "Public" : "Private"}
            </span>

            <span className={"hidden md:inline-block lg:hidden xl:block"}>&middot;</span>
            <span className={"text-sm text-gray-500 hidden md:inline-block lg:hidden xl:block"}>
              Updated {timeSince(dataset.updatedOn)} ago
            </span>
          </div>

          <p
            className={"text-gray-500"}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
            }}
          >
            {dataset.subtitle}
          </p>

          <button
            onClick={() => {
              router.push(`/view/${datasetId}`);
            }}
            className={"flex items-center gap-1 text-black"}
          >
            <span>View Dataset</span>
            <ArrowSmallRightIcon className={"w-5 h-5 mb-0.5"} />
          </button>
        </div>

        <button
          onClick={handleUpvote}
          className={`flex items-stretch rounded-full overflow-hidden p-2 ${isUpvoted ? "bg-red-500" : "border border-gray-200"}`}
        >
          <HeartIcon className={`w-5 h-5 ${isUpvoted ? "text-white" : ""}`} />
        </button>

        {dataset.owner === user.userId ? (
          <div className={"relative flex items-center"}>
            <button
              onClick={() => {
                setOpenSettings(true);
              }}
            >
              <EllipsisVerticalIcon className={"w-5 h-5"} />
            </button>

            <div
              onClick={() => {
                setOpenSettings(false);
              }}
              className={`fixed top-0 left-0 w-full h-screen ${openSettings ? "z-10" : "-z-10"}`}
            />

            <div
              className={`absolute top-8 right-0 bg-white border border-gray-200 ${
                openSettings ? "opacity-100 z-20" : "opacity-0 -z-20"
              } transition-opacity duration-300 rounded-md`}
              style={{
                minWidth: "90px",
              }}
            >
              <button onClick={handleEdit} className={"w-full border-b border-gray-200 p-2 flex items-center justify-start gap-2"}>
                <PencilSquareIcon className={"w-5 h-5 mb-1"} />
                <span>Edit</span>
              </button>

              <button disabled={deleting} onClick={handleDelete} className={"w-full p-2 flex items-center justify-start gap-2"}>
                {deleting ? <ClipLoader size={25} color={"#010101"} /> : <TrashIcon className={"w-5 h-5 mb-1"} />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <EditDatasetModal open={openEditDatasetModal} setOpen={setOpenEditDatasetModal} datasetData={dataset} />
    </div>
  );
}
