import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Chip = function (props: any) {
  return (
    <div
      className={`flex items-center mx-1 font-medium text-sm py-1 px-2 rounded text-white bg-${
        props.color || "purple"
      }-500`}
    >
      {props.children}
      <FontAwesomeIcon
        icon={faTimes}
        color="white"
        className="ml-2 cursor-pointer"
        onClick={() => props.onDelete(props.value)}
      />
    </div>
  );
};
