import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import { setLoggedIn, setUserData } from "../../store/auth.slice";
import AuthNavbar from "../components/auth-navbar";
import { fireAuth } from "../fire-app";
import getUserDoc from "../fire-app/getUserDoc";

export default function withAuth(Component) {
  const AuthenticatedComponent = () => {
    const disptach = useDispatch();
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fireAuth.onAuthStateChanged(async (user) => {
        if (user) {
          disptach(setLoggedIn(true));
          const userDoc = await getUserDoc(user.email);
          disptach(
            setUserData({
              userId: userDoc.id,
              ...userDoc.data(),
            })
          );
          setLoading(false);
        } else {
          disptach(setLoggedIn(false));
          disptach(setUserData(null));
          router.push("/");
        }
      });
    }, []);

    return !loading ? (
      <div>
        <AuthNavbar>
          <Component />
        </AuthNavbar>
      </div>
    ) : (
      <div className={"w-full h-screen p-8 flex items-center justify-center"}>
        <ClipLoader size={100} color={"#010101"} />
      </div>
    );
  };

  return AuthenticatedComponent;
}
