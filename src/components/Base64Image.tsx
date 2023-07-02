import Image from "next/image";
import React from "react";

const Base64Image = ({ base64Image }: { base64Image?: string }) => {
  const src = base64Image
    ? `data:image/jpeg;base64,${base64Image}`
    : "/no_image_yoko.jpg";
  return (
    <Image
      src={src}
      alt="画像が表示出来ません"
      layout="responsive"
      width={100}
      height={100}
    />
  );
};

export default Base64Image;
