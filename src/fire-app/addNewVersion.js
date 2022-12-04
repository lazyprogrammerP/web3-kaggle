import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { fireDb } from ".";

export default async function addNewVersion(datasetId, newVersion) {
  console.log(newVersion);
  await updateDoc(doc(fireDb, "datasets", datasetId), {
    versions: arrayUnion(newVersion),
  }).catch((error) => {
    console.log("ERROR: ", error.code, error.message);
  });
}
