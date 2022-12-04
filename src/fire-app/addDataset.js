import { collection, addDoc } from "firebase/firestore";
import { fireDb } from ".";

export default async function addDataset(data) {
  // Adds the data to firebase
  await addDoc(collection(fireDb, "datasets"), {
    ...data,
  }).catch((error) => {
    console.log("ERROR: ", error.code, error.message);
  });
}
