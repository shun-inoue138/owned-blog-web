import { UserContainer } from "@/store/userContainer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContainer.Provider>
      <Component {...pageProps} />
    </UserContainer.Provider>
  );
}
