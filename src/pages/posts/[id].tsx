import { Post, PostAPI } from "@/api/PostAPI";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await PostAPI.findAll();

  const paths = posts.map((post) => ({
    params: { id: post._id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({
  params,
}) => {
  // TODO:赤線を削除するために無理やり型キャストしている。要精査。
  const post = await PostAPI.findOne(params?.id as string);

  return { props: { post } };
};

const PostDetail = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Header />
      {/* TODO: ここでPostDetailコンポーネントを呼び出す。とりあえずPostCardで代用 */}
      <PostCard {...post} />
    </div>
  );
};

export default PostDetail;
