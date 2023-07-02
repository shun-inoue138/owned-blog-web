import { UserAPI } from "@/api/UserAPI";
import ErrorMessage from "@/components/elements/ErrorMessage";
import SimpleButton from "@/components/elements/SimpleButton";
import StyledInput from "@/components/elements/StyledInput";
import AuthLayout from "@/components/layouts/AuthLayout";
import { UserContainer } from "@/store/UserContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z
    .string()
    .min(1, {
      message: "入力必須です",
    })
    .email({
      message: "メールアドレスの形式で入力してください",
    }),
  password: z.string().min(1, {
    message: "入力必須です",
  }),
});
type FormData = z.infer<typeof schema>;

const SignIn = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { setUser } = UserContainer.useContainer();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { user, token } = await UserAPI.signIn(data);
      localStorage.setItem("token", token);
      setUser(user);
      setIsLoading(false);
      alert("ログインしました");
      router.push("/posts");
    } catch (error) {
      alert("ログインに失敗しました");
      setIsLoading(false);
    }
  };
  return (
    <>
      <AuthLayout>
        <div className="text-center font-bold text-2xl mb-8 ">
          ログインはこちらから
        </div>
        <form
          className="flex flex-col h-full mx-4"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div>
            <label>
              <div className=" text-sub_text text-xl  mb-2">Eメール</div>
              <input {...register("email")} className="auth-input" />
              <ErrorMessage>
                {errors.email && errors.email.message}
              </ErrorMessage>
            </label>
          </div>
          <div>
            <label>
              <div className=" text-sub_text text-xl  mb-2">パスワード</div>
              {/* // TODO:赤線対処 */}
              <input
                {...register("password")}
                type="password"
                className="auth-input"
              />
              <ErrorMessage>
                {errors.password && errors.password.message}
              </ErrorMessage>
            </label>
          </div>
          <SimpleButton Btype="main" disabled={!isValid} type="submit">
            {isLoading ? "Loading..." : "ログイン"}
          </SimpleButton>
          <SimpleButton
            onClick={(e) => {
              e.preventDefault();
              router.push(
                {
                  pathname: "/sign-up",
                  query: {
                    email: getValues("email"),
                    password: getValues("password"),
                  },
                },
                "/sign-up"
              );
            }}
            Btype="text"
          >
            登録ページへ移動する
          </SimpleButton>
        </form>
      </AuthLayout>
    </>
  );
};

export default SignIn;
