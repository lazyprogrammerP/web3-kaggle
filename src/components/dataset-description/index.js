import ReactMarkdown from "react-markdown";

export default function DatasetDescription({ datasetData }) {
  return (
    <div className={"col-span-12 lg:col-span-7 xl:col-span-8 p-4 space-y-2 rounded-md border border-gray-200"}>
      <h3 className={"text-lg font-bold"}>Dataset Description</h3>

      <div className={"prose"}>
        <ReactMarkdown>{datasetData.about}</ReactMarkdown>
      </div>
    </div>
  );
}
