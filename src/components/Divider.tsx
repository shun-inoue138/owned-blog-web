import React from "react";
import clsx from "clsx";

const getSpacingClass = (spacing: "sm" | "md" | "lg") => {
  switch (spacing) {
    case "sm":
      return "my-2";
    case "md":
      return "my-4";
    case "lg":
      return "my-8";
  }
};

const Divider = ({ spacing = "md" }: { spacing?: "sm" | "md" | "lg" }) => {
  const spacingClass = getSpacingClass(spacing);
  return <div className={clsx("border border-sub_text", spacingClass)}></div>;
};

export default Divider;
