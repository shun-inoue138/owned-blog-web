import Image from "next/image";
import React from "react";

// TODO:BaseImageコンポーネントを作成して、通常のImageコンポーネントとBase64Imageに分離させた方がいいかも
const Base64Image = ({ base64Image }: { base64Image?: string }) => {
  const src = base64Image
    ? `data:image/jpeg;base64,${base64Image}`
    : "/no_image_yoko.jpg";
  return (
    <div className="relative w-full pt-[60%]">
      {/* // TODO:layoutとobjectFitが非推奨? */}
      <Image
        src={src}
        alt="画像が表示出来ません"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default Base64Image;
