import clsx from "clsx";
import React, { ComponentProps, FC } from "react";

const getBTypeClass = (Btype: string) => {
  const SuccessClass = "bg-success text-base_text";
  const InfoClass = "bg-info text-base_text";
  const AlertClass = "bg-alert text-base_text";
  const TextClass = "bg-base text-main_text";
  const MainClass = "bg-main text-base_text";
  switch (Btype) {
    case "success":
      return SuccessClass;
    case "info":
      return InfoClass;
    case "alert":
      return AlertClass;
    case "text":
      return TextClass;
    case "main":
      return MainClass;
  }
};

const SimpleButton: FC<
  //classNameを拒絶して親からスタイリング出来なくする
  Omit<
    ComponentProps<"button"> & {
      children: string;
      Btype: "success" | "info" | "alert" | "text" | "main";
      disabled?: boolean;
    },
    "className"
  >
> = ({ children, Btype = "main", disabled = false, ...restProps }) => {
  const BTypeClass = getBTypeClass(Btype);
  const disabledClass = disabled && "opacity-50 cursor-not-allowed";
  return (
    <button
      className={clsx(
        //TODO: hover時のスタイリング
        "text-center py-2 px-6 rounded-md shadow-sm font-bold",
        BTypeClass,
        disabledClass
      )}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default SimpleButton;
