import { Post, PostAPI } from "@/api/PostAPI";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { UserContainer } from "@/store/UserContainer";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

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
  const router = useRouter();
  const { user } = UserContainer.useContainer();
  const isMyPost = useMemo(() => {
    //user._id === post.user._id;において左辺右辺ともにundefinedの場合にtrueを返すことを避けるために user?._id && を追加
    return Boolean(user?._id && user._id === post.user._id);
  }, [user, post]);
  return (
    <div>
      <Header />
      {/* TODO: ここでPostItemlコンポーネントを呼び出す。とりあえずPostCardで代用 */}
      <PostCard isMyPost={isMyPost} {...post} />
      {isMyPost && (
        <div className="flex gap-3 justify-end mt-4 text-2xl">
          <Link href={`/posts/${post._id}/edit`}>
            <AiOutlineEdit className="text-info" />
          </Link>
          <button
            onClick={async () => {
              // TODO:モーダルに変更したい
              const res = confirm("削除しますか？");
              if (res) {
                try {
                  await PostAPI.delete(post._id);
                  alert("削除しました");
                  router.push("/posts");
                } catch (error) {
                  alert("削除に失敗しました");
                }
              }
            }}
          >
            <RiDeleteBinLine className="text-alert" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
