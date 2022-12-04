import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import addNewVersion from "../../fire-app/addNewVersion";
import makeStorageClient from "../../web3-storage";

export default function AddNewVersionModal({ open, setOpen, datasetData }) {
  const [uploading, setUploading] = useState(false);
  const [datasetFormData, setDatasetFormData] = useState({});

  const [addingNewVersion, setAddingNewVersion] = useState(false);

  const handleUploadFile = async (e) => {
    if (!e.target.files?.length) {
      return;
    }

    setUploading(true);

    // After the root CID has been decided, set the related data to state
    const onRootCidReady = (cid) => {
      setDatasetFormData({
        uploadedFile: `${cid}.ipfs.w3s.link`,
        fileName: e.target.files[0]?.name,
        uploadedFileSize: `${(parseInt(e.target.files[0]?.size) / 1000000).toFixed(3)} MB(s)`,
      });
    };

    // Created Web3 Storage client
    const storageClient = makeStorageClient();

    // Uploads the selected file to Web3 Storage
    await storageClient.put([e.target.files[0]], { wrapWithDirectory: false, onRootCidReady }).catch((error) => {
      console.log("ERROR: ", error.code, error.message);
    });

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAddingNewVersion(true);

    // Build data record schema to save in firebase
    const data = {
      version: datasetData.versions.length,
      cid: datasetFormData.uploadedFile,
      fileName: datasetFormData.fileName,
      size: datasetFormData.uploadedFileSize,
    };

    await addNewVersion(datasetData.id, data);

    setOpen(false);
    setAddingNewVersion(true);

    setDatasetFormData({});
  };

  return (
    <>
      <div
        onClick={() => {
          setOpen(false);
        }}
        id={"add-new-version-model-overlay"}
        className={`mt-0 fixed top-0 left-0 w-full h-screen bg-black ${
          open ? "bg-opacity-60 z-10" : "bg-opacity-0 -z-10"
        } transition-all duration-300 backdrop-blur-sm`}
      />

      <div
        id={"add-new-version-model"}
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl p-4 bg-white rounded-2xl ${
          open ? "opacity-100 z-20" : "opacity-0 -z-20"
        } transition-all duration-300 overflow-auto`}
        style={{
          maxHeight: "90vh",
        }}
      >
        <form onSubmit={handleSubmit} className={"space-y-2"}>
          <h3 className={"text-lg font-bold"}>New Version</h3>

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
            <div className={"w-full py-4 px-8 rounded-md bg-gray-50 border-2 border-dashed border-gray-200"}>
              <div className={"flex flex-col items-center justify-center gap-2"}>
                <div>
                  <CloudArrowUpIcon className={"w-16 h-16 -mt-2"} />
                </div>

                <div className={"text-center"}>
                  <h3 className={"text-lg font-semibold"}>Drag &amp; Drop</h3>
                  <p>You can upload files with the following extensions: .csv, .xlsx, .xlsb or .zip files.</p>
                </div>

                <div className={"w-full flex items-center justify-center gap-2"}>
                  <span className={"flex-1 h-px bg-gray-200"} />
                  <span className={"uppercase text-sm text-gray-500"}>or</span>
                  <span className={"flex-1 h-px bg-gray-200"} />
                </div>

                <button
                  type={"button"}
                  disabled={uploading}
                  onClick={() => {
                    document.getElementById("choose-files-input").click();
                  }}
                  className={`py-2 px-4 ${uploading ? "bg-gray-500" : "bg-black"} text-white rounded-full`}
                >
                  Choose Files
                </button>

                <input
                  id={"choose-files-input"}
                  type={"file"}
                  accept={
                    ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, zip, application/octet-stream, application/zip, application/x-zip, application/x-zip-compressed"
                  }
                  onChange={handleUploadFile}
                  className={"hidden"}
                />
              </div>
            </div>
          )}

          <button
            disabled={addingNewVersion}
            type={"submit"}
            className={`py-2 px-4 ${addingNewVersion ? "bg-gray-500" : "bg-black"} text-white rounded-full`}
          >
            Create Version
          </button>
        </form>
      </div>
    </>
  );
}
