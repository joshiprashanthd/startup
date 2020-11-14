import React from "react";

export const Modal = function (props: any) {
  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto">
      <div className="absolute w-full h-full bg-gray-600 opacity-50 pointer-events-none"></div>
      <div className="z-50 w-3/6 p-4 bg-white rounded-lg">{props.children}</div>
    </div>
  );
};

Modal.Title = function (props: any) {
  return <h1 className="text-lg font-display"> {props.children}</h1>;
};
