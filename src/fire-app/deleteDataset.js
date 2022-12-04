import { doc, deleteDoc } from "firebase/firestore";
import { fireDb } from ".";

export default async function deleteDataset(datasetId) {
  return await deleteDoc(doc(fireDb, "datasets", datasetId)).catch((error) => {
    console.log("ERROR: ", error.code, error.message);
  });
}
