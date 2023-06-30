import PostForm from "@/components/PostForm";
import { UserContainer } from "@/store/UserContainer";
import React from "react";

const Create = () => {
  const { user } = UserContainer.useContainer();
  console.log(user);

  //// TODO:分岐条件これでいいか考える.万が一roleプロパティに”wiewer”(誤字)のような値が格納されていた場合、投稿ページが表示されてしまう。
  if (user?.role === "viewer" || !user) {
    //現状adminユーザーやcontributorユーザーでも一瞬このページが表示されてしまうが、取り敢えずOK
    return <div>アクセス権限がありません</div>;
  }

  return (
    <>
      {/* 編集画面の場合データをpropsで渡す。 */}
      <PostForm userId={user._id} />
    </>
  );
};

export default Create;
