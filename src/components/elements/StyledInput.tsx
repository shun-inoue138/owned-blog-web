import React, { ComponentPropsWithRef, FC } from "react";

const StyledInput: FC<
  //classNameを拒絶して親からスタイリング出来なくする
  Omit<ComponentPropsWithRef<"input">, "className">
> = (props) => {
  return (
    <input className="outline rounded-md py-1 md:py-2 px-4 w-full" {...props} />
  );
};

export default StyledInput;
