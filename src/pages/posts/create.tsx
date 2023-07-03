import Header from "@/components/Header";
import PostForm from "@/components/PostForm";
import { UserContainer } from "@/store/UserContainer";
import React from "react";

const Create = () => {
  const { signInUser } = UserContainer.useContainer();

  //// TODO:分岐条件これでいいか考える.万が一roleプロパティに”wiewer”(誤字)のような値が格納されていた場合、投稿ページが表示されてしまう。
  if (signInUser?.role === "viewer" || !signInUser) {
    //現状adminユーザーやcontributorユーザーでも一瞬このページが表示されてしまうが、取り敢えずOK
    return <div>アクセス権限がありません</div>;
  }

  return (
    <div className="h-screen">
      <Header />
      {/* 編集画面の場合データをpropsで渡す。 */}
      <div className="pt-16">
        <PostForm userId={signInUser._id} />
      </div>
    </div>
  );
};

export default Create;
