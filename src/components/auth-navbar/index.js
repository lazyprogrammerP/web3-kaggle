import {
  BellIcon,
  ChatBubbleLeftRightIcon,
  CommandLineIcon,
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../store/auth.slice";

export default function AuthNavbar({ children }) {
  const router = useRouter();

  const userData = useSelector(selectUserData);

  return (
    <div>
      <div className={"flex items-center justify-between gap-8 p-6 border-b border-gray-200"}>
        <div className={"flex-1 flex items-center gap-8"}>
          <div
            className={"relative w-48 h-auto"}
            style={{
              aspectRatio: "496 / 81",
            }}
          >
            <Image fill objectFit={"cover"} src={"/logo.png"} />
          </div>

          <div className={"flex-1 max-w-lg hidden md:flex items-center gap-2 py-1.5 px-3 rounded-full border border-gray-200"}>
            <input placeholder={"Search for datasets"} className={"w-full focus:outline-none"} />
            <MagnifyingGlassIcon className={"w-5 h-5"} />
          </div>
        </div>

        {userData ? (
          <div className={"flex items-center gap-4"}>
            <BellIcon className={"w-5 h-5"} />
            <div className={"flex items-center gap-2"}>
              <span className={"hidden md:block"}>Hi, {userData.displayName.split(" ")[0]} 👋</span>
              <div className={"w-10 h-10 relative rounded-full overflow-hidden"}>
                <Image fill objectFit={"cover"} src={userData.photoURL} />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className={"flex"}>
        <div
          className={"w-72 hidden lg:flex border-r border-gray-200"}
          style={{
            height: "calc(100vh - 89px)",
          }}
        >
          <div className={"p-8 space-y-4"}>
            <Link href={"/dashboard"} className={"flex items-center gap-2"}>
              {router.asPath === "/dashboard" ? <div className={"w-px h-8 bg-black rounded-full"} /> : <></>}
              <HomeIcon className={"w-6 h-6"} />
              <p className={"text-lg font-semibold mt-1"}>Dashboard</p>
            </Link>

            <div className={"flex items-center gap-2 cursor-pointer"}>
              <ServerStackIcon className={"w-6 h-6"} />
              <p className={"text-lg font-semibold mt-1"}>Pipelines</p>
            </div>

            <Link href={"/explore"} className={"flex items-center gap-2"}>
              {router.asPath === "/explore" ? <div className={"w-px h-8 bg-black rounded-full"} /> : <></>}
              <DocumentMagnifyingGlassIcon className={"w-6 h-6"} />
              <p className={"text-lg font-semibold mt-1"}>Explore</p>
            </Link>

            <div className={"flex items-center gap-2 cursor-pointer"}>
              <CommandLineIcon className={"w-6 h-6"} />
              <p className={"text-lg font-semibold mt-1"}>Codespaces</p>
            </div>

            <div className={"flex items-center gap-2 cursor-pointer"}>
              <ChatBubbleLeftRightIcon className={"w-6 h-6"} />
              <p className={"text-lg font-semibold mt-1"}>Discussions</p>
            </div>
          </div>
        </div>

        <div
          className={"flex-1 p-8 overflow-auto"}
          style={{
            height: "calc(100vh - 89px)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
