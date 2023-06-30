import PostForm from "@/components/PostForm";
import { UserContainer } from "@/store/UserContainer";
import React from "react";

const create = () => {
  return (
    <>
      {/* 編集画面の場合データをpropsで渡す。 */}
      <PostForm />
    </>
  );
};

export default create;
