import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/posts");
  }, []);
  // TODO:他の方法考える
  return <div>記事一覧画面に遷移します</div>;
}
