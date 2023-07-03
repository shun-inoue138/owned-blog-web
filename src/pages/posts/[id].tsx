import { Post, PostAPI } from "@/api/PostAPI";
import Base64Image from "@/components/Base64Image";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import { UserContainer } from "@/store/UserContainer";
import { getIsMyPost } from "@/utils/getIsMyPost";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import Divider from "@/components/elements/Divider";
import dayjs from "dayjs";

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
  const [showImage, setShowImage] = useState<boolean>(true);
  const { signInUser } = UserContainer.useContainer();
  // TODO:なぜか動かない
  const isMyPost = useMemo(() => {
    return getIsMyPost(signInUser, post);
  }, [signInUser, post]);

  return (
    <div className="mb-8">
      <Header />
      {/* TODO: ここでPostItemコンポーネントを呼び出す。とりあえずPostCardで代用 */}
      <h1 className="text-center font-bold text-2xl sticky top-24 z-50 bg-main text-base_text pb-2 opacity-95 truncate">
        {post.title}
      </h1>
      <div className="w-full h-full relative">
        <div
          className={clsx(
            showImage ? "h-full" : "h-0",
            "overflow-hidden transition-all ease-in-out"
          )}
        >
          <Base64Image base64Image={post.image} />
        </div>
        <button
          onClick={() => {
            setShowImage((prev) => !prev);
          }}
          className={clsx(
            "bg-base text-main_text text-xl  rounded-full absolute right-2 z-10",
            showImage ? "bottom-2 " : "bottom-[-2] mt-2 "
          )}
        >
          {showImage ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
      </div>
      <div className="w-[88%] max-w-[1200px] mx-auto">
        <div className="mt-8">
          <h2 className="text-sub_text text-lg">Content</h2>
          <div className="mt-1 leading-7 tracking-wide">
            {post.content.split("\n").map((line, i) => (
              <p key={i}>
                {line}
                <br />
              </p>
            ))}
          </div>
        </div>
        <Divider spacing="lg" />
        <div className="mt-4">
          <h2 className="text-sub_text text-lg">Authored By</h2>
          <p className="mt-1">{post.user.name}</p>
        </div>
        <Divider spacing="lg" />
        <div className="mt-4">
          <h2 className="text-sub_text text-lg">Created</h2>
          <p className="mt-1">
            {dayjs(post.createdAt).format("YYYY/MM/DD HH:MM:ss")}
          </p>
        </div>
        <Divider spacing="lg" />
        <div className="mt-4">
          <h2 className="text-sub_text text-ls">Last Updated</h2>
          <p className="mt-1">
            {dayjs(post.updatedAt).format("YYYY/MM/DD HH:MM:ss")}
          </p>
        </div>
        {isMyPost && (
          <div className="flex gap-3 justify-end  text-3xl sticky bottom-8 right-8">
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
    </div>
  );
};

export default PostDetail;
