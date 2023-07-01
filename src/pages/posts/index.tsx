import { GetStaticProps } from "next";
import { Post, PostAPI } from "@/api/PostAPI";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import Header from "@/components/Header";
import { useEffect, useMemo, useState } from "react";
import { UserContainer } from "@/store/UserContainer";

export const getStaticProps: GetStaticProps = async () => {
  const posts = await PostAPI.findAll();
  console.log(posts);
  console.log(posts.length);

  return {
    props: {
      posts,
    },
    // revalidate: 60,
  };
};

type Props = {
  posts: Post[];
};

const Index: React.FC<Props> = ({ posts }) => {
  const { user } = UserContainer.useContainer();
  const [postsToDisplay, setPostsToDisplay] = useState<Post[]>(posts);
  const [shouldDisplayOnlyMyPosts, setShouldDisplayOnlyMyPosts] =
    useState<boolean>(false);

  useEffect(() => {
    if (shouldDisplayOnlyMyPosts) {
      setPostsToDisplay(posts.filter((post) => post.user._id === user?._id));
    } else {
      setPostsToDisplay(posts);
    }
  }, [shouldDisplayOnlyMyPosts]);
  return (
    <>
      <Header />
      {(user?.role === "admin" || user?.role === "contributor") && (
        <div className=" ml-8 mt-7 sticky top-24 z-10">
          <label>
            <input
              type="checkbox"
              onChange={() => {
                setShouldDisplayOnlyMyPosts((prev) => !prev);
              }}
            />
            <span className="ml-2 ">自分の投稿のみ表示する</span>
          </label>
        </div>
      )}

      <div className="w-[96%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-6 mt-24">
        {postsToDisplay.map((post) => {
          const isMyPost = Boolean(user?._id && user._id === post.user._id);
          return (
            <Link key={post._id} href={`/posts/${post._id}`}>
              <PostCard isMyPost={isMyPost} {...post} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Index;
