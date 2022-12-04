import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { fireAuth, fireDb } from ".";
import getUserDoc from "./getUserDoc";

export default async function signIn() {
  // Open the sign-in modal
  const provider = new GoogleAuthProvider();
  const authResult = await signInWithPopup(fireAuth, provider).catch((error) => {
    console.log("ERROR: ", error.code, error.message);
  });

  // Extract the user object
  const user = authResult.user;

  const userDoc = await getUserDoc(user.email);

  // Create user doc if it doesn't exist
  if (!userDoc.exists()) {
    const docData = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    const userDocRef = doc(fireDb, "users", user.email);
    await setDoc(userDocRef, docData).catch((error) => {
      console.log("ERROR: ", error.code, error.message);
    });

    // Return the freshly created user data
    return docData;
  }

  // Return the data of the current user doc
  return userDoc.data;
}
