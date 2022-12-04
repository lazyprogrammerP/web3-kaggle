import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, setUserData } from "../../../store/auth.slice";
import { fireAuth } from "../../fire-app";
import getUserDoc from "../../fire-app/getUserDoc";
import signIn from "../../fire-app/signIn";

export default function Navbar() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [signingIn, setSigningIn] = useState(false);
  const user = useSelector(selectUserData);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignIn = () => {
    setSigningIn(true);
    signIn().catch((error) => {
      console.log("ERROR: ", error.code, error.message);
      setSigningIn(false);
    });
  };

  const handleSignOut = () => {
    setSigningOut(true);
    fireAuth.signOut().catch((error) => {
      console.log("ERROR: ", error.code, error.message);
      setSigningOut(false);
    });
  };

  useEffect(() => {
    fireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getUserDoc(user.email);
        dispatch(
          setUserData({
            ...(userDoc?.data() || {}),
          })
        );
        setSigningIn(false);
        setSigningOut(false);
      } else {
        dispatch(setUserData(null));
        setSigningIn(false);
        setSigningOut(false);
      }
    });
  }, []);

  return (
    <div className={"flex items-center justify-between p-6"}>
      <div className={"flex items-center gap-8"}>
        <div
          className={"relative w-48 h-auto"}
          style={{
            aspectRatio: "496 / 81",
          }}
        >
          <Image fill objectFit={"cover"} src={"/logo.png"} />
        </div>
      </div>

      {!user ? (
        <button
          disabled={signingIn}
          onClick={handleSignIn}
          className={`py-2 px-4 ${signingIn ? "bg-gray-500" : "bg-black"} text-white rounded-full`}
        >
          Sign In
        </button>
      ) : (
        <div className={"flex items-center gap-4"}>
          <button
            disabled={signingOut}
            onClick={handleSignOut}
            className={`py-2 px-4 ${signingOut ? "text-gray-500" : "text-black"} rounded-full hidden lg:block`}
          >
            Sign Out
          </button>

          <button
            onClick={() => {
              router.push("/dashboard");
            }}
            className={`py-2 px-4 bg-black text-white rounded-full`}
          >
            Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
