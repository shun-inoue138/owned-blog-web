import React, { FC, ReactNode } from "react";

const ErrorMessage: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <p className="h-4 md:h-6 text-alert font-semibold mt-1 text-xs md:text-base">
      {children}
    </p>
  );
};

export default ErrorMessage;
