import { useForm } from "react-hook-form";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
    .max(1000, { message: "1000文字以内で入力してください" }),
  image: z
    .custom<FileList>()
    .transform((file) => file[0])
    .optional(),
  isPrivate: z.boolean(),
});
type FormData = z.infer<typeof schema>;

//投稿ページと編集ページの共用コンポーネントにする
export default function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const image = watch("image");
  const isPrivate = watch("isPrivate");
  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      // if (result.status === 200) {
      //   ページを遷移させるなどの処理
      // }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen my-auto">
      <form
        className="p-4 max-w-[600px] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-5 text-3xl text-main_text font-bold text-center">
          記事新規作成
        </h1>
        <label className="mb-6 block">
          <h2>タイトル</h2>
          <input className="w-full  p-2 rounded" {...register("title")} />
          {errors?.title && (
            <p className="text-accent">{errors.title.message}</p>
          )}
        </label>

        <label className="mb-6 block">
          <h2>本文</h2>
          <textarea
            className="w-full  p-2 rounded mb-0"
            {...register("content")}
          />
          {errors?.content && (
            <p className="text-accent w-full">{errors.content.message}</p>
          )}
        </label>
        <div className="flex justify-between ">
          <div>
            <label className="block">
              <BiImageAdd className="text-3xl text-main_text" />
              <input type="file" className="hidden" {...register("image")} />
            </label>
            {image?.name && (
              <div className="flex items-center gap-2">
                <p className="max-w-[10em] truncate">{image.name}</p>
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
    </div>
  );
}
