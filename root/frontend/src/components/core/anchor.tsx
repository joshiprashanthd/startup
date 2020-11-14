import React from "react";
import classnames from "classnames";

interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  textColor?: string;
  fontWeight?: string;
  hoverTextColor?: string;
  hoverUnderline?: boolean;
}

export const Anchor: React.FC<IProps> = function ({
  children,
  textColor = "black",
  fontWeight = "normal",
  hoverTextColor = "black",
  hoverUnderline = true,
  ...restProps
}) {
  return (
    <span
      className={classnames(
        `text-${textColor} cursor-pointer ${
          hoverUnderline && "hover:underline"
        } hover:text-${hoverTextColor} font-body font-${fontWeight}`
      )}
      {...restProps}
    >
      {children}
    </span>
  );
};
