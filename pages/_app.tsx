import type { AppProps } from "next/app";
import wrapper from "../store/index";
import "../styles/globals.css";

export default wrapper.withRedux(function App({ Component, pageProps }: AppProps) {
  return (
    <div className={"bg-white"}>
      <Component {...pageProps} />
    </div>
  );
});
