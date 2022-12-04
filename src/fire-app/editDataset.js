import { doc, updateDoc } from "firebase/firestore";
import { fireDb } from ".";

export default async function editDataset(datasetId, data) {
  // Adds the data to firebase
  await updateDoc(doc(fireDb, "datasets", datasetId), {
    ...data,
  }).catch((error) => {
    console.log("ERROR: ", error.code, error.message);
  });
}
