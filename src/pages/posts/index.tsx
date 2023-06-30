import { GetStaticProps } from "next";
import { Post, PostAPI } from "@/api/PostAPI";
import PostCard from "@/components/PostCard";
import Link from "next/link";

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
  return (
    <>
      <div className="w-[96%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  gap-6">
        {posts.map((post) => {
          return (
            <Link key={post._id} href={`/posts/${post._id}`}>
              <PostCard {...post} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Index;
