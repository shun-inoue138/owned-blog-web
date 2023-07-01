import { UserContainer } from "@/store/UserContainer";
import Link from "next/link";
import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";
import { SlLogin } from "react-icons/sl";

const Header = () => {
  const { user } = UserContainer.useContainer();

  return (
    <div className="h-24 px-4 bg-main  flex items-center justify-between text-base_text text-xl w-full sticky top-0 opacity-95 z-10">
      <Link href="/posts">MY BLOG</Link>
      {/* ログインボタン、投稿ボタン、ユーザー名、管理ボタン */}
      <div className="flex gap-6 items-end">
        {/* // TODO:hoge && fugaに書き換え */}
        {user?.role === "admin" || user?.role === "contributor" ? (
          <Link href="/posts/create">
            <BsPencilSquare />
          </Link>
        ) : null}

        {user ? (
          <Link href="/log-out">
            <SlLogout />
          </Link>
        ) : (
          <Link href="/sign-in">
            <SlLogin />
          </Link>
        )}

        <span className="text-base ml-4">{user?.name}さん</span>
      </div>
    </div>
  );
};

export default Header;
