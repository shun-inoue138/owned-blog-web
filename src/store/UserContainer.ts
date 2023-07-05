import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import axios from "axios";
import { User, verifyToken } from "@/api/UserAPI";
const useUserContainer = () => {
  const [signInUser, setSignInUser] = useState<User | undefined>(undefined);

  // // TODO:下記問題が解消されたら削除する
  // const mockId = {
  //   admin: "649e47f56deab5893ad6f1a3",
  //   viewer: "649d45722d531a1031883860",
  //   contributor: "649e94e988a1755bb0d869cb",
  // };
  // // TODO:ログイン画面未実装のため、仮にここでユーザーを取得しsetUserしている。実装完了後はログイン完了のタイミングでsetUserする
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await UserAPI.findOne(mockId.admin);
  //     setUser(user);
  //   };
  //   fetchUser();
  // }, []);

  useEffect(() => {
    //アプリをリロードした時に手元のtokenが有効な場合ログイン状態に移行する。
    const verify = async () => {
      const signInUser = await verifyToken();
      if (!signInUser) return;
      setSignInUser(signInUser);
    };
    verify();
  }, []);

  return { signInUser, setSignInUser };
};

export const UserContainer = createContainer(useUserContainer);
