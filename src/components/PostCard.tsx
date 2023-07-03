import Image from "next/image";
import React, { FC, memo } from "react";
import Divider from "./elements/Divider";
import { Post } from "@/api/PostAPI";
import dayjs from "dayjs";
import clsx from "clsx";
import Base64Image from "./Base64Image";

const PostCard: FC<Post & { isMyPost?: boolean }> = ({
  isMyPost = false,
  ...post
}) => {
  return (
    <div>
      <div className="relative w-full h-auto">
        {/* TODO:要修正 */}
        <Base64Image base64Image={post.image} />
      </div>
      <div className="p-6 shadow-md">
        <h2 className="text-lg truncate max-w-[15em]">{post.title}</h2>
        <Divider />
        <p className="h-[5em] truncate">{post.content}</p>
        <Divider />
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <span className="bg-main text-base_text rounded-md p-2">
              投稿日
            </span>
            <p>{dayjs(post.createdAt).format("YYYY/MM/DD HH:mm")}</p>
          </div>
          <p className="text-right">
            <span className="mr-1 text-sm text-sub_text">by</span>
            <span
              className={clsx(
                "text-lg",
                isMyPost && "text-xl text-success font-semibold"
              )}
            >
              {post.user.name}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(PostCard);
