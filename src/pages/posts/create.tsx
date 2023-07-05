import AuthCheckerPerPage from "@/components/AuthCheckerPerPage";
import Header from "@/components/Header";
import PostForm from "@/components/PostForm";
import { UserContainer } from "@/store/UserContainer";
import React from "react";

const Create = () => {
  const { signInUser } = UserContainer.useContainer();

  return (
    <AuthCheckerPerPage>
      <div className="h-screen">
        <Header />
        <div className="pt-16">
          {/* AuthCheckerPerPageがsignInUser !== undefinedを担保 */}
          <PostForm userId={signInUser!._id} postType="create" />
        </div>
      </div>
    </AuthCheckerPerPage>
  );
};

export default Create;
