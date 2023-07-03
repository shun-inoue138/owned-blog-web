import { useForm } from "react-hook-form";
import { BiImageAdd } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post, PostAPI } from "@/api/PostAPI";
import { User } from "@/api/UserAPI";
import { useRouter } from "next/router";
import { useEffect } from "react";
import clsx from "clsx";

const schema = z.object({
  title: z
    .string()
    .min(1, { message: "入力必須です" })
    .max(100, { message: "100文字以内で入力してください" }),
  content: z
    .string()
    .min(1, {
      message: "入力必須です",
    })
    .max(1200, { message: "1200文字以内で入力してください" }),
  image: z
    .custom<FileList>()
    .transform((file) => file[0])
    .optional(),
  isPrivate: z.boolean(),
});
type FormData = z.infer<typeof schema>;

export default function PostForm({
  userId,
  postToEdit,
  postType,
}: {
  userId: User["_id"];
  postToEdit?: Post;
  postType: "create" | "edit";
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: postToEdit?.title,
      content: postToEdit?.content,
      isPrivate: postToEdit?.isPrivate,
      // TODO:base64形式の画像文字列をFile形式に変換する必要がある
    },
  });

  const image = watch("image");
  const isPrivate = watch("isPrivate");
  const contentLength = watch("content")?.length;

  const onSubmit = async (data: FormData) => {
    try {
      // TODO:編集の場合はPostAPI.updateを呼び出す.user:userIdに違和感。設計がそもそもおかしいかも。
      if (postType === "create") {
        await PostAPI.create({ ...data, user: userId });
      } else if (postType === "edit") {
        await PostAPI.edit(postToEdit?._id as string, {
          ...data,
          user: userId,
        });
      }
      // TODO:一覧画面or詳細画面に画面遷移
      alert(postType === "create" ? "作成しました" : "編集しました");
      router.push("/posts");
    } catch (err) {
      console.log(err);
      // TODO:alertではなくトーストに変更
      alert(
        "エラーが発生しました。しばらく時間をおいてから再度お試しください。"
      );
    }
  };

  return (
    <form
      className="p-4 max-w-[600px] mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-5 text-3xl text-main_text font-bold text-center">
        {postType === "create" ? "記事新規作成" : "記事編集"}
      </h1>
      <label className="mb-6 block">
        <h2>タイトル</h2>
        <input className="w-full  p-2 rounded" {...register("title")} />
        {errors?.title && <p className="text-accent">{errors.title.message}</p>}
      </label>
      <label className="mb-6 block">
        <h2>本文</h2>
        {/* // TODO:画面幅に応じて動的にrowsを変更したい */}
        <textarea
          className="w-full  p-2 rounded mb-0"
          rows={5}
          {...register("content")}
        />
        <div className="flex">
          {errors?.content && (
            <p className="text-accent w-full ">{errors.content.message}</p>
          )}
          <div
            className={clsx(
              "flex justify-end gap-2 w-full",
              contentLength > 1200 && "text-alert"
            )}
          >
            {contentLength ? <span>{contentLength}</span> : <span>0</span>}
            <span>/</span>
            <span>1200</span>
          </div>
        </div>
      </label>

      <div className="flex justify-between ">
        {/* // TODO:画像編集機能を追加する */}
        <div className={postType === "edit" ? "hidden" : ""}>
          <label className="block">
            <BiImageAdd className="text-3xl text-main_text" />
            <input type="file" className="hidden" {...register("image")} />
          </label>

          {image?.[0]?.name && (
            <div className="flex items-center gap-2">
              <p className="max-w-[10em] truncate">{image?.[0]?.name}</p>
              <button
                onClick={() => {
                  setValue("image", undefined);
                }}
              >
                <ImCross className="text-accent" />
              </button>
            </div>
          )}
        </div>
        <label>
          <input type="checkbox" {...register("isPrivate")} />
          <span className="ml-1 text-sub_text text-sm">公開しない</span>
        </label>
      </div>
      <button
        className="w-full mt-6 py-2 px-4 rounded bg-main text-base_text"
        type="submit"
      >
        {isPrivate ? "下書き保存" : "投稿"}
      </button>
    </form>
  );
}
