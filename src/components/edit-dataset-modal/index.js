import { CloudArrowUpIcon, GlobeAltIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import editDataset from "../../fire-app/editDataset";

export default function EditDatasetModal({ open, setOpen, datasetData }) {
  const [datasetFormData, setDatasetFormData] = useState({ public: true });

  const [editingDataset, setEditingDataset] = useState(false);

  const handleFormChange = (e) => {
    setDatasetFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEditingDataset(true);

    // Build data record schema to save in firebase
    const data = {
      name: datasetFormData.datasetName,
      subtitle: datasetFormData.datasetSubtitle,
      about: datasetFormData.aboutDataset,
      public: datasetFormData.public,
      updatedOn: Date.now(),
    };

    console.log(data);

    await editDataset(datasetData.id, data);

    setOpen(false);
    setEditingDataset(false);

    // Clear the form again
    setDatasetFormData({});
  };

  useEffect(() => {
    if (open && datasetData) {
      setDatasetFormData({
        datasetName: datasetData.name,
        datasetSubtitle: datasetData.subtitle,
        aboutDataset: datasetData.about,
        public: datasetData.public,
        uploadedFile: datasetData.versions?.[datasetData.versions?.length - 1]?.cid,
        fileName: datasetData.versions?.[datasetData.versions?.length - 1]?.fileName,
        uploadedFileSize: datasetData.versions?.[datasetData.versions?.length - 1]?.size,
      });
    }
  }, [open, datasetData]);

  return (
    <>
      <div
        onClick={() => {
          setOpen(false);
        }}
        id={"edit-dataset-model-overlay"}
        className={`mt-0 fixed top-0 left-0 w-full h-screen bg-black ${
          open ? "bg-opacity-60 z-10" : "bg-opacity-0 -z-10"
        } transition-all duration-300 backdrop-blur-sm`}
      />

      <div
        id={"edit-dataset-model"}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl p-4 bg-white rounded-2xl ${
          open ? "opacity-100 z-50" : "opacity-0 -z-50"
        } transition-all duration-300 overflow-auto`}
        style={{
          maxHeight: "90vh",
        }}
      >
        <form onSubmit={handleSubmit} className={"space-y-2"}>
          <div className={"flex items-center justify-between"}>
            <h3 className={"text-lg font-bold"}>Edit Dataset</h3>
            {datasetFormData.public ? (
              <button
                type={"button"}
                onClick={() => {
                  setDatasetFormData((prev) => ({
                    ...prev,
                    public: false,
                  }));
                }}
                className={`py-2 px-4 text-black rounded-full flex items-center gap-2`}
              >
                <LockClosedIcon className={"w-5 h-5 mb-1"} />
                <span>Make Private</span>
              </button>
            ) : (
              <button
                type={"button"}
                onClick={() => {
                  setDatasetFormData((prev) => ({
                    ...prev,
                    public: true,
                  }));
                }}
                className={`py-2 px-4 text-black rounded-full flex items-center gap-2`}
              >
                <GlobeAltIcon className={"w-5 h-5 mb-1"} />
                <span>Make Public</span>
              </button>
            )}
          </div>

          <input
            name={"datasetName"}
            value={datasetFormData.datasetName}
            placeholder={"Dataset Name"}
            onChange={handleFormChange}
            className={"w-full py-2 px-4 rounded-md border border-gray-200 focus:outline-none"}
          />
          <input
            name={"datasetSubtitle"}
            value={datasetFormData.datasetSubtitle}
            placeholder={"Dataset Subtitle"}
            onChange={handleFormChange}
            className={"w-full py-2 px-4 rounded-md border border-gray-200 focus:outline-none"}
          />

          {datasetFormData.uploadedFile ? (
            <div className={"py-2 px-4 rounded-md border border-gray-200"}>
              <div className={"flex items-center gap-1"}>
                <CloudArrowUpIcon className={"w-5 h-5 mb-1"} />
                <p>Uploaded File</p>
              </div>

              <a
                href={`https://${datasetFormData.uploadedFile}`}
                target={"_blank"}
                rel={"noreferrer"}
                className={"text-gray-500 border-b-2 border-dashed border-gray-200"}
              >
                {`${datasetFormData.uploadedFile.slice(0, 15)}...${datasetFormData.uploadedFile.slice(
                  datasetFormData.uploadedFile.length - 15
                )}`}{" "}
                ({datasetFormData.uploadedFileSize})
              </a>
            </div>
          ) : (
            <></>
          )}

          <textarea
            rows={5}
            name={"aboutDataset"}
            value={datasetFormData.aboutDataset}
            placeholder={"About This Dataset"}
            onChange={handleFormChange}
            className={"w-full py-2 px-4 rounded-md border border-gray-200 focus:outline-none"}
          />

          <button
            disabled={editingDataset}
            type={"submit"}
            className={`py-2 px-4 ${editingDataset ? "bg-gray-500" : "bg-black"} text-white rounded-full`}
          >
            Update Dataset
          </button>
        </form>
      </div>
    </>
  );
}
