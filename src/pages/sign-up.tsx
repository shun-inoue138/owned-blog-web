import { UserAPI } from "@/api/UserAPI";
import ErrorMessage from "@/components/elements/ErrorMessage";
import SimpleButton from "@/components/elements/SimpleButton";
import StyledInput from "@/components/elements/StyledInput";
import AuthLayout from "@/components/layouts/AuthLayout";
import { UserContainer } from "@/store/UserContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(1, "入力必須です"),
    email: z.string().email("メールアドレスの形式で入力してください"),
    password: z.string().min(8, "8文字以上で入力してください"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "パスワードが一致しません",
    path: ["passwordConfirmation"],
  });
type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { setSignInUser } = UserContainer.useContainer();
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
      const { user, token } = await UserAPI.signUp(data);
      localStorage.setItem("token", token);
      setSignInUser(user);
      setIsLoading(false);
      alert("ユーザー登録しました");
      router.push("/posts");
    } catch (error) {
      // TODO:失敗理由を表示したい
      alert("ユーザー登録に失敗しました");
      setIsLoading(false);
    }
  };
  return (
    <AuthLayout>
      <div className="text-center font-bold text-2xl mb-8 ">
        ユーザー登録はこちらから
      </div>
      <form
        className="flex flex-col h-full mx-4"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div>
          <label>
            <div className=" text-sub_text  mb-2">名前</div>
            <input className="auth-input" {...register("name")} />
            <ErrorMessage>{errors.name && errors.name.message}</ErrorMessage>
          </label>
        </div>
        <div>
          <label>
            <div className=" text-sub_text  mb-2">Eメール</div>
            <input className="auth-input" {...register("email")} />
            <ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
          </label>
        </div>
        <div>
          <label>
            <div className=" text-sub_text  mb-2">パスワード</div>
            <input
              className="auth-input"
              {...register("password")}
              type="password"
            />
            <ErrorMessage>
              {errors.password && errors.password.message}
            </ErrorMessage>
          </label>
        </div>
        <div>
          <label>
            <div className=" text-sub_text  mb-2">パスワード確認</div>
            <input
              className="auth-input"
              {...register("passwordConfirmation")}
              type="password"
            />
            <ErrorMessage>
              {errors.passwordConfirmation &&
                errors.passwordConfirmation.message}
            </ErrorMessage>
          </label>
        </div>
        <SimpleButton Btype="main" disabled={!isValid} type="submit">
          {isLoading ? "Loading..." : "登録"}
        </SimpleButton>
        <SimpleButton
          onClick={(e) => {
            e.preventDefault();
            router.push(
              {
                pathname: "/sign-in",
                query: {
                  email: getValues("email"),
                  password: getValues("password"),
                },
              },
              "/sign-in"
            );
          }}
          Btype="text"
        >
          ログインページへ移動する
        </SimpleButton>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
