import { UserContainer } from "@/store/UserContainer";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect, useMemo } from "react";

const AuthCheckerPerPage: FC<{ children: ReactNode }> = ({ children }) => {
  const { signInUser } = UserContainer.useContainer();
  const router = useRouter();
  const isPostableUser = useMemo(() => {
    return signInUser?.role === "admin" || signInUser?.role === "contributor";
  }, [signInUser?.role]);

  useEffect(() => {
    if (!isPostableUser) {
      setTimeout(() => {
        router.push("/posts");
      }, 2000);
    }
  }, [signInUser, router]);

  if (!isPostableUser) {
    return <h1>権限がありません</h1>;
  }

  return <>{children}</>;
};

export default AuthCheckerPerPage;
