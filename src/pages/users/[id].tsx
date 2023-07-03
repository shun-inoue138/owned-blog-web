import { Post, PostAPI } from "@/api/PostAPI";
import { User, UserAPI } from "@/api/UserAPI";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import PrivateBadge from "@/components/elements/PrivateBadge";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const userId = params?.id;

  // TODO:型キャストなるべく避けたい
  const user = await UserAPI.findOne(userId as string);
  const posts = await PostAPI.findAllByUser(userId as string);

  return {
    props: { user, posts },
  };
};

const UserPage: FC<{ user: User; posts: Post[] }> = ({ user, posts }) => {
  return (
    <div>
      <Header />
      {/* //top-24はヘッダーの高さに依存している　→　Headerに移した方がいい？ */}
      <h1 className="text-center font-bold text-3xl sticky top-24 z-10 bg-main text-base_text pb-2 opacity-95">
        {user.name} <span className="text-xl">記事一覧</span>
      </h1>
      <div className="w-[96%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-6 mt-24">
        {posts.map((post) => {
          return (
            // TODO:PostCardにLinkを含めるべきかもしれない
            <Link key={post._id} href={`/posts/${post._id}`}>
              <div className="w-full h-full relative">
                <PrivateBadge hidden={post.isPrivate} />
                <PostCard {...post} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default UserPage;
