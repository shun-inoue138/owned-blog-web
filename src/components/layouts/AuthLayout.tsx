import { useRouter } from "next/router";
import React, {
  Children,
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
} from "react";

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen  flex flex-col md:flex-row  items-center  justify-around  max-w-[1200px] mx-auto">
      <div className="md:mb-0">
        <h1 className="text-5xl text-main font-bold font-sans  text-center md:mt-0 tracking-widest">
          My Blog
        </h1>
      </div>
      <div className="w-[300px] md:w-[40%]">{children}</div>
    </div>
  );
};

export default AuthLayout;
