import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5YVfhrPkDBLvGNfZxiuT_SEZvpaAwIaQ",
  authDomain: "web3-kaggle.firebaseapp.com",
  projectId: "web3-kaggle",
  storageBucket: "web3-kaggle.appspot.com",
  messagingSenderId: "204752241794",
  appId: "1:204752241794:web:24f9aa6e9a4e94ec08609b",
};

const fireApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
export const fireAuth = getAuth(fireApp);
export const fireDb = getFirestore(fireApp);

export default fireApp;
