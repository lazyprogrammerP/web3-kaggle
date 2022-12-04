import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { fireDb } from ".";

export default async function toggleUpvote(isUpvoted, userId, datasetId) {
  // Adds the data to firebase
  await updateDoc(doc(fireDb, `users/${userId}`), {
    upvotedDatasets: isUpvoted ? arrayRemove(datasetId) : arrayUnion(datasetId),
  }).catch((error) => {
    console.log("ERROR: ", error.code, error.message);
  });
}
