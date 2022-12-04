import { collection, onSnapshot, query, where } from "firebase/firestore";
import { fireDb } from ".";

export default function getPublicDatasets(userId, callback) {
  const datasetsCollectionRef = collection(fireDb, "datasets");
  const queryRef = query(datasetsCollectionRef, where("owner", "!=", userId), where("public", "==", true));

  onSnapshot(queryRef, callback);
}
