import React, { ButtonHTMLAttributes } from "react";
import classnames from "classnames/bind";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "flat";
}

let ButtonStyles = {
  base:
    "w-full inline-flex items-center justify-center text-sm font-medium font-body focus:outline-none rounded outline-none",
  primary:
    "text-white duration-200 bg-purple-700 hover:bg-purple-800 disabled:bg-gray-300 disabled:text-gray-500 p-2",
  secondary:
    "bg-white border hover:bg-gray-100 disabled:bg-gray-300 disabled:text-gray-600 p-2",
  flat: "text-black bg-white disabled:text-gray-300",
};

export const Button: React.FC<IProps> = function ({
  children,
  variant = "primary",
  disabled,
  ...restProps
}) {
  let cx = classnames.bind(ButtonStyles);

  console.log(
    cx({
      base: true,
      primary: variant === "primary",
      secondary: variant === "secondary",
      flat: variant === "flat",
    })
  );

  return (
    <button
      className={cx({
        base: true,
        primary: variant === "primary",
        secondary: variant === "secondary",
        flat: variant === "flat",
      })}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};
