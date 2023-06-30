import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import axios from "axios";
import { User, UserAPI } from "@/api/UserAPI";
const useUserContainer = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  // TODO:ログイン画面未実装のため、仮にここでユーザーを取得しsetUserしている。実装完了後はログイン完了のタイミングでsetUserする
  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserAPI.getOne("649d45722d531a1031883860");
      setUser(user);
    };
    fetchUser();
  }, []);

  return { user, setUser };
};

export const UserContainer = createContainer(useUserContainer);
