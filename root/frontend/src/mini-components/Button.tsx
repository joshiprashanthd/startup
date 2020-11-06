import React, { ButtonHTMLAttributes } from "react";

export const Button: React.FC<ButtonHTMLAttributes<
  HTMLButtonElement
>> = function (props) {
  return (
    <button
      className={`inline-flex items-center justify-center w-full py-2 mt-2 font-semibold text-white duration-200 bg-purple-500 rounded shadow-sm ${
        !props.disabled && "hover:bg-purple-600 "
      } focus:outline-none ${
        !props.disabled && "active:bg-purple-700"
      } disabled:opacity-50`}
      {...props}
    >
      {props.children}
    </button>
  );
};