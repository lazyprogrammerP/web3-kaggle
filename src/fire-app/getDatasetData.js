import { doc, onSnapshot } from "firebase/firestore";
import { fireDb } from ".";

export default async function getDatasetData(datasetId, callback) {
  const datasetDocRef = doc(fireDb, "datasets", datasetId);
  onSnapshot(datasetDocRef, callback);
}
