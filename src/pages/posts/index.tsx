import { GetStaticProps } from "next";
import { Post, PostAPI } from "@/api/PostAPI";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import Header from "@/components/Header";
import { useEffect, useMemo, useState } from "react";
import { UserContainer } from "@/store/UserContainer";
import { getIsMyPost } from "@/utils/getIsMyPost";

export const getStaticProps: GetStaticProps = async () => {
  const posts = await PostAPI.findAllExceptPrivate();
  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
};

type Props = {
  posts: Post[];
};

const Index: React.FC<Props> = ({ posts }) => {
  const { signInUser } = UserContainer.useContainer();
  const [postsToDisplay, setPostsToDisplay] = useState<Post[]>(posts);
  const [shouldDisplayOnlyMyPosts, setShouldDisplayOnlyMyPosts] =
    useState<boolean>(false);
  const isPostableUser = useMemo(() => {
    return signInUser?.role === "admin" || signInUser?.role === "contributor";
  }, [signInUser?.role]);

  useEffect(() => {
    if (shouldDisplayOnlyMyPosts) {
      setPostsToDisplay(
        posts.filter((post) => post.user._id === signInUser?._id)
      );
    } else {
      setPostsToDisplay(posts);
    }
  }, [shouldDisplayOnlyMyPosts]);
  return (
    <>
      <Header />
      {isPostableUser && (
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
          const isMyPost = getIsMyPost(signInUser, post);
          return (
            // TODO:PostCardにLinkを含めるべきかもしれない
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
