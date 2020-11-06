import React from "react";

export const Button = function (props: any) {
  return (
    <button
      disabled={props.disabled}
      className="inline-flex items-center justify-center w-full py-2 mt-2 font-semibold text-white duration-200 bg-purple-500 rounded hover:bg-purple-600 focus:outline-none active:bg-purple-700 disabled:opacity-50"
      {...props}
    >
      {props.children}
    </button>
  );
};
