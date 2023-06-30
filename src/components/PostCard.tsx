import Image from "next/image";
import React, { FC } from "react";
import Divider from "./Divider";
import { Post } from "@/api/PostAPI";
import dayjs from "dayjs";

const PostCard: FC<Post> = (post) => {
  return (
    <div>
      <div className="relative w-full h-auto">
        {/* TODO:要修正 */}
        <Image
          src="/masahiro-miyagi-18ef3TE0jdQ-unsplash.jpg"
          alt="画像なし"
          layout="responsive"
          width={100}
          height={100}
        />
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
            <p>
              {/* //dayjsを用いてYYMMDD HH:mm:ssで表示 */}
              {dayjs().format("YYYY/MM/DD HH:mm")}
            </p>
          </div>
          <p className="text-right">
            <span className="mr-1 text-sm text-sub_text">by</span>
            <span className="text-lg">{post.user.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
