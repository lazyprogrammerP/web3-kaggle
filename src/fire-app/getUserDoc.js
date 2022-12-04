import { doc, getDoc } from "firebase/firestore";
import { fireDb } from ".";

export default async function getUserDoc(id) {
  const userDocRef = doc(fireDb, "users", id);
  return await getDoc(userDocRef).catch((error) => {
    console.log("ERROR: ", error.code, error.message);
  });
}
