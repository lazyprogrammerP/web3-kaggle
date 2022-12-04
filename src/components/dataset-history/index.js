import { DocumentTextIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../store/auth.slice";
import AddNewVersionModal from "../add-new-version-modal";

export default function DatasetHistory({ datasetData }) {
  const user = useSelector(selectUserData);

  const [openAddVersionModal, setOpenAddVersionModal] = useState(false);

  return (
    <>
      <div className={"col-span-12 lg:col-span-5 xl:col-span-4 p-4 space-y-2 rounded-md border border-gray-200 max-h-96 overflow-auto"}>
        <h3 className={"text-lg font-bold"}>Dataset History</h3>

        <div className={"space-y-2"}>
          {datasetData.versions.map((version) => (
            <div key={version.version} className={"space-y-1"}>
              <div>
                <h4>Version {version.version + 1}</h4>
              </div>

              <div className={"flex items-start gap-1"}>
                <DocumentTextIcon className={"w-5 h-5 text-gray-500"} />
                <div>
                  <a
                    href={`https://${version.cid}`}
                    target={"_blank"}
                    rel={"noreferrer"}
                    className={"text-gray-500 border-b-2 border-dashed border-gray-200"}
                  >
                    {`${version.fileName.slice(0, 15)}${
                      version.fileName.length <= 15 ? "" : `...${version.fileName.slice(version.fileName.length - 15)}`
                    }`}
                  </a>
                  <p className={"text-gray-500 text-xs"}>{version.size}</p>
                </div>
              </div>
            </div>
          ))}

          {user.userId === datasetData.owner ? (
            <button
              onClick={() => {
                setOpenAddVersionModal(true);
              }}
              className={"py-2 px-4 border border-black rounded-full flex items-center gap-1"}
            >
              <PlusIcon className={"w-5 h-5 mb-0.5"} />
              <span>New Version</span>
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>

      <AddNewVersionModal open={openAddVersionModal} setOpen={setOpenAddVersionModal} datasetData={datasetData} />
    </>
  );
}
