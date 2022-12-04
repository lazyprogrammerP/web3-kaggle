import { collection, onSnapshot, query, where } from "firebase/firestore";
import { fireDb } from ".";

export default function getDatasets(userId, callback) {
  const datasetsCollectionRef = collection(fireDb, "datasets");
  const queryRef = query(datasetsCollectionRef, where("owner", "==", userId));

  onSnapshot(queryRef, callback);
}
