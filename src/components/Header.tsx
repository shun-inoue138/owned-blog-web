import { UserContainer } from "@/store/UserContainer";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { SlLogout } from "react-icons/sl";
import { SlLogin } from "react-icons/sl";

const Header = () => {
  const { signInUser, setSignInUser } = UserContainer.useContainer();
  const router = useRouter();
  const isPostableUser = useMemo(() => {
    return signInUser?.role === "admin" || signInUser?.role === "contributor";
  }, [signInUser?.role]);

  return (
    <div className="h-24 px-4 bg-main  flex items-center justify-between text-base_text text-xl w-full sticky top-0 opacity-95 z-50">
      <Link href="/posts">MY BLOG</Link>
      <div className="flex gap-6 items-end">
        {isPostableUser && (
          <Link href="/posts/create">
            <BsPencilSquare />
          </Link>
        )}
        {signInUser ? (
          <button
            onClick={() => {
              if (confirm("ログアウトしますか？")) {
                setSignInUser(undefined);
                localStorage.removeItem("token");
                router.push("/sign-in");
              }
            }}
          >
            <SlLogout />
          </button>
        ) : (
          <Link href="/sign-in">
            <SlLogin />
          </Link>
        )}

        <Link href={`/users/${signInUser?._id}`}>
          <span className="text-base ml-4 max-w-[12em] truncate">
            {signInUser?.name && signInUser.name + "さん"}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
