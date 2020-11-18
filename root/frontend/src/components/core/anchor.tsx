import React from "react";
import classnames from "classnames";

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  textColor?: string;
  fontWeight?: string;
  fontSize?: string;
  hoverTextColor?: string;
  hoverUnderline?: boolean;
}

export const Anchor: React.FC<IProps> = function ({
  children,
  textColor = "black",
  fontWeight = "normal",
  hoverTextColor = "black",
  hoverUnderline = true,
  fontSize = "base",
  ...restProps
}) {
  return (
    <a
      className={classnames(
        `text-${textColor} cursor-pointer ${
          hoverUnderline && "hover:underline"
        } hover:text-${hoverTextColor} font-body font-${fontWeight} text-${fontSize}`
      )}
      {...restProps}
    >
      {children}
    </a>
  );
};
