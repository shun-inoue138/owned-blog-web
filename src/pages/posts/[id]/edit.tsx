import { Post, PostAPI } from "@/api/PostAPI";
import AuthCheckerPerPage from "@/components/AuthCheckerPerPage";
import Header from "@/components/Header";
import PostForm from "@/components/PostForm";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

//SSRかCSR

const Edit = () => {
  const [postToEdit, setPostToEdit] = useState<Post | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (!router.query.id) return;
    const fetchPostToEdit = async () => {
      setIsLoading(true);
      const post = await PostAPI.findOne(router.query.id as string);
      setPostToEdit(post);
      setIsLoading(false);
    };
    fetchPostToEdit();
  }, [router.query.id]);

  if (isLoading) return <div>Loading....</div>;

  return (
    <AuthCheckerPerPage>
      <div className="h-screen">
        <Header />
        {/* 編集画面の場合データをpropsで渡す。 */}
        <div className="pt-16">
          {/* AuthCheckerPerPageがsignInUser !== undefinedを担保 */}
          <PostForm
            userId={postToEdit?.user._id as string}
            postType="edit"
            postToEdit={postToEdit}
          />
        </div>
      </div>
    </AuthCheckerPerPage>
  );
};

export default Edit;
