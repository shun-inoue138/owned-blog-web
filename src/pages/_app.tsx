import { UserAPI } from "@/api/UserAPI";
import { UserContainer } from "@/store/UserContainer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FC, ReactNode, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContainer.Provider>
      <TokenChecker>
        <Component {...pageProps} />
      </TokenChecker>
    </UserContainer.Provider>
  );
}

const TokenChecker: FC<{ children: ReactNode }> = ({ children }) => {
  const { setSignInUser } = UserContainer.useContainer();
  useEffect(() => {
    //アプリをリロードした時に手元のtokenが有効な場合ログイン状態に移行する。
    const verifyToken = async () => {
      const signInUser = await UserAPI.verifyToken();
      if (!signInUser) return;
      setSignInUser(signInUser);
    };
    verifyToken();
  }, []);

  return <>{children}</>;
};
