import React, { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<IProps> = function ({
  children,
  variant = "primary",
  disabled,
  ...restProps
}) {
  let className = `w-full inline-flex items-center justify-center p-2 text-sm font-medium text-white duration-200 bg-purple-500 rounded shadow-sm  outline-none ${
    !disabled && "hover:bg-purple-600 "
  } focus:outline-none ${
    !disabled && "active:bg-purple-700"
  } disabled:opacity-50 font-body `;

  if (variant === "secondary")
    className = `w-full inline-flex items-center justify-center text-sm p-2 font-medium duration-200 bg-white border rounded shadow-sm outline-none ${
      !disabled && "hover:bg-gray-200 "
    } focus:outline-none ${
      !disabled && "active:bg-gray-300"
    } disabled:opacity-50 font-body `;

  return (
    <button className={className} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};
